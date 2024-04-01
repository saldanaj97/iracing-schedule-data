/* eslint-disable @typescript-eslint/no-unused-vars */
import Axios from 'axios'
import { wrapper } from 'axios-cookiejar-support'
import CryptoJs from 'crypto-js'
import fs from 'fs'
import { CookieJar } from 'tough-cookie'
import type { CarData, Schedule, SeriesData, Track } from './types'

// TODO: BETTER ERROR HANDLING ACROSS THE BOARD

// Save the cookie-jar for every req
const jar = new CookieJar()
const client = wrapper(
  Axios.create({
    jar,
  })
)

/**  Function that will authenticate with iRacing API for any subsequent requests
 * @return: Returns a token for the cookie-jar
 */
const fetchAuthCookie = async ({ username, password }: { username: string; password: string }) => {
  const iRacingEmail = username
  const iRacingPassword = password

  // Hash the password as instructed from iRacing team here: https://forums.iracing.com/discussion/15068/general-availability-of-data-api/p1
  const hash = CryptoJs.SHA256(iRacingPassword + iRacingEmail.toLowerCase())
  const hashInBase64 = CryptoJs.enc.Base64.stringify(hash)

  // Make the request to the link provided in the docs and retrieve the cookie data for subsequent requests
  try {
    const URL = 'https://members-ng.iracing.com/auth'
    const { data } = await client.post(URL, {
      email: iRacingEmail,
      password: hashInBase64,
    })
    console.log('Successfully authenticated with iRacing API')
    return data
  } catch (error) {
    console.log(error)
  }
}

/** Function to get series data for a specific year and season
 * @return: Basic data about a specific series using year and quarter
 */
const getCertainSeriesData = async ({ year, quarter }: { year: string; quarter: string }) => {
  try {
    // Make the request to the season link provided in the docs at: https://members-ng.iracing.com/data/doc/series
    const URL = `https://members-ng.iracing.com/data/season/list?season_year=${year}&season_quarter=${quarter}`

    // Get the link we need for the data as stated in the docs
    const { link } = await client.get(URL).then((response) => response.data)

    // Get all the series in the season
    const { seasons } = await client.get(link).then((response) => response.data)
    return seasons
  } catch (error) {
    console.log(error)
  }
}

/** Function to get series data current season (not as much detail as the get series data function)
 * @returns: BASIC data about every active series in this season
 */
// TODO: Distinguish difference between this function and the one below
const getSeriesData = async () => {
  try {
    const URL = `https://members-ng.iracing.com/data/series/get`
    const { link } = await client.get(URL).then((response) => response.data)
    const { data } = await client.get(link).then((response) => response)
    return data
  } catch (error) {
    console.log(error)
  }
}

/**
 * Retrieves the detailed season series data for EVERY series in the current season.
 * @returns {Promise<Array<Object>>} The season series data.
 */
const getDetailedSeriesData = async (): Promise<SeriesData[] | undefined> => {
  try {
    const URL = 'https://members-ng.iracing.com/data/series/seasons?include_series=1'
    const { link } = (await client.get(URL)).data

    const seasonSeriesData: SeriesData[] = []

    for (const series of (await client.get(link)).data) {
      const { season_id, series_id, series_name, car_class_ids, track_types, fixed_setup, official, license_group, schedules } = series

      const singleSeriesSchedule: Schedule[] = schedules.map((schedule: any) => ({
        race_week_num: schedule.race_week_num,
        race_lap_limit: schedule.race_lap_limit,
        race_time_limit: schedule.race_time_limit,
        session_start_data: schedule.race_time_descriptors,
        track: schedule.track,
      }))

      seasonSeriesData.push({
        season_id,
        series_id,
        series_name,
        car_class_ids,
        track_type: track_types[0].track_type,
        fixed_setup,
        official,
        license_group,
        schedule: singleSeriesSchedule,
      })
    }

    return seasonSeriesData
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**  Function that will grab EVERY car available on the service
 * @returns: A list containing each cars id and the corresponding vehicle in natural language
 */
const getListOfAllCars = async (): Promise<CarData[] | undefined> => {
  try {
    const URL = 'https://members-ng.iracing.com/data/carclass/get'
    const { link } = (await client.get(URL)).data

    const listOfAvailableCars: CarData[] = (await client.get(link)).data.map((car: any) => ({
      id: car.car_class_id,
      name: car.name,
      shortName: car.short_name,
    }))

    return listOfAvailableCars
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**  Function that will grab all the tracks available on the service
 * @returns: A list containing each track with its id, name, and category
 */
const getTrackData = async (): Promise<Track[] | undefined> => {
  const trackData: Track[] = []
  const seen: Set<string> = new Set() // Use a set to efficiently check for duplicates

  try {
    const URL = 'https://members-ng.iracing.com/data/track/get'
    const { link } = (await client.get(URL)).data

    const response = (await client.get(link)).data
    for (const track of response) {
      const { track_id, track_name, category } = track
      if (!seen.has(track_name)) {
        seen.add(track_name)
        trackData.push({ id: track_id, name: track_name, category })
      }
    }

    return trackData
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**  Function to write JSON data to specified file.
 * @returns: N/A
 */
// TODO: Add error handling/logging/remove altogether potentially
const writeDataToFile = ({ jsonData, fileName }: { jsonData: string; fileName: string }) => {
  fs.writeFile(fileName, jsonData, function (error) {
    if (error) return console.log(`An error occured while writing data to ${fileName}...`, error)
  })
  console.log(`Data has been successfully written to ${fileName}`)
}

// Get the authentication cookie for all requests
const auth = await fetchAuthCookie({ username: '***', password: '***' })

// Get the series data for a specific year and season and store away in respective file
const specificSeasonSeriesData = await getCertainSeriesData({ year: '2022', quarter: '2' })

// Get the current seasons series data (more generalized data such as series ID, name, licenses etc..)
const generalizedSeriesData = await getSeriesData()

// Get the detailed data for the season series
const detailedSeriesData = await getDetailedSeriesData()

// Get the data for each vehicle
const carData = await getListOfAllCars()

// Get all the tracks offered in the game
const trackData = await getTrackData()
