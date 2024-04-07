/* eslint-disable @typescript-eslint/no-unused-vars */
import Axios from 'axios'
import { wrapper } from 'axios-cookiejar-support'
import CryptoJs from 'crypto-js'
import fs from 'fs'
import { dirname } from 'path'
import { CookieJar } from 'tough-cookie'
import type { Car, Series, SeriesData, Track } from './types'

// TODO: BETTER ERROR HANDLING ACROSS THE BOARD

// Save the cookie-jar for every req
const jar = new CookieJar()
const client = wrapper(
  Axios.create({
    jar,
  })
)

/**
 * Function that will authenticate with iRacing API for any subsequent requests
 * @return: Returns a token for the cookie-jar
 */
export const fetchAuthCookie = async ({ username, password }: { username: string; password: string }) => {
  // Hash the password as instructed from iRacing team here: https://forums.iracing.com/discussion/15068/general-availability-of-data-api/p1
  const hash = CryptoJs.SHA256(password + username.toLowerCase())
  const hashInBase64 = CryptoJs.enc.Base64.stringify(hash)

  // Make the request to the link provided in the docs and retrieve the cookie data for subsequent requests
  try {
    console.log('\nAttempting to authenticate with iRacing API...\n')
    const { data } = await client.post('https://members-ng.iracing.com/auth', {
      email: username,
      password: hashInBase64,
    })
    if (data.authcode === 0) throw new Error(`Failed to authenticate with iRacing API. ${data.message}\n`)
    console.log('\nSuccessfully authenticated with iRacing API\n')
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Function to get series data current season (not as much detail as the get series data function)
 * @returns: BASIC data about every active series in this season
 */
export const getAllSeriesInCurrentSeason = async (): Promise<Series[] | undefined> => {
  try {
    const URL = `https://members-ng.iracing.com/data/series/get`
    const { link } = await client.get(URL).then((response) => response.data)
    const { data } = await client.get(link).then((response) => response.data)
    return data
  } catch (error) {
    return undefined
  }
}

/**
 * Retrieves the detailed season series data for EVERY series in the current season.
 * @returns {Promise<Array<Object>>} The season series data.
 */
export const getDetailedSeriesData = async (): Promise<SeriesData[] | undefined> => {
  try {
    const URL = 'https://members-ng.iracing.com/data/series/seasons?include_series=1'
    const { link } = (await client.get(URL)).data

    const seasonSeriesData: SeriesData[] = []

    for (const series of (await client.get(link)).data) {
      const {
        season_id,
        series_id,
        series_name,
        car_class_ids,
        track_types,
        fixed_setup,
        official,
        license_group,
        schedule,
      } = series

      seasonSeriesData.push({
        season_id,
        series_id,
        series_name,
        car_class_ids,
        track_type: track_types[0].track_type,
        fixed_setup,
        official,
        license_group,
        schedule,
      })
    }

    return seasonSeriesData
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Function that will grab EVERY car available on the service
 * @returns: A list containing each cars id and the corresponding vehicle in natural language
 */
export const getListOfAllCars = async (): Promise<Car[] | undefined> => {
  try {
    const URL = 'https://members-ng.iracing.com/data/carclass/get'
    const { link } = (await client.get(URL)).data

    const listOfAvailableCars: Car[] = []
    const seen: Set<string> = new Set() // Use a set to efficiently check for duplicates

    const response = (await client.get(link)).data
    for (const car of response) {
      const { car_class_id, cars_in_class, cust_id, name, rain_enabled, relative_speed, short_name } = car
      if (!seen.has(name)) {
        seen.add(name)
        listOfAvailableCars.push({
          car_class_id,
          cars_in_class,
          cust_id,
          name,
          rain_enabled,
          relative_speed,
          short_name,
        })
      }
    }

    console.log(listOfAvailableCars)

    return listOfAvailableCars
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Function that will grab all the tracks available on the service
 * @returns: A list containing each track with its id, name, and category
 */
export const getTrackData = async (): Promise<Track[] | undefined> => {
  const trackData: Track[] = []
  const seen: Set<string> = new Set()
  try {
    const URL = 'https://members-ng.iracing.com/data/track/get'
    const { link } = (await client.get<{ link: string }>(URL)).data

    const response: Track[] = (await client.get<Track[]>(link)).data
    for (const track of response) {
      const {
        ai_enabled,
        allow_pitlane_collisions,
        allow_rolling_start,
        allow_standing_start,
        award_exempt,
        category,
        category_id,
        closes,
        config_name,
        corners_per_lap,
        created,
        first_sale,
        free_with_subscription,
        fully_lit,
        grid_stalls,
        has_opt_path,
        has_short_parade_lap,
        has_start_zone,
        has_svg_map,
        is_dirt,
        is_oval,
        is_ps_purchasable,
        lap_scoring,
        latitude,
        location,
        longitude,
        max_cars,
        night_lighting,
        nominal_lap_time,
        number_pitstalls,
        opens,
        package_id,
        pit_road_speed_limit,
        price,
        price_display,
        priority,
        purchasable,
        qualify_laps,
        rain_enabled,
        restart_on_left,
        retired,
        search_filters,
        site_url,
        sku,
        solo_laps,
        start_on_left,
        supports_grip_compound,
        tech_track,
        time_zone,
        track_config_length,
        track_dirpath,
        track_id,
        track_name,
        track_types,
      } = track
      if (!seen.has(track_name)) seen.add(track_name)
      trackData.push({
        ai_enabled,
        allow_pitlane_collisions,
        allow_rolling_start,
        allow_standing_start,
        award_exempt,
        category,
        category_id,
        closes,
        config_name,
        corners_per_lap,
        created,
        first_sale,
        free_with_subscription,
        fully_lit,
        grid_stalls,
        has_opt_path,
        has_short_parade_lap,
        has_start_zone,
        has_svg_map,
        is_dirt,
        is_oval,
        is_ps_purchasable,
        lap_scoring,
        latitude,
        location,
        longitude,
        max_cars,
        night_lighting,
        nominal_lap_time,
        number_pitstalls,
        opens,
        package_id,
        pit_road_speed_limit,
        price,
        price_display,
        priority,
        purchasable,
        qualify_laps,
        rain_enabled,
        restart_on_left,
        retired,
        search_filters,
        site_url,
        sku,
        solo_laps,
        start_on_left,
        supports_grip_compound,
        tech_track,
        time_zone,
        track_config_length,
        track_dirpath,
        track_id,
        track_name,
        track_types,
      })
    }

    return trackData
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Function to write JSON data to specified file.
 * @returns: N/A
 */
// TODO: Add error handling/logging/remove altogether potentially
export const writeDataToFile = ({ jsonData, fileDir }: { jsonData: string; fileDir: string }) => {
  const directory = dirname(fileDir)
  if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true })

  fs.writeFile(fileDir, jsonData, (error) => {
    if (error) {
      console.error(`An error occurred while writing data to ${fileDir}:`, error)
    } else {
      console.log(`Data has been successfully written to ${fileDir}`)
    }
  })
}

//  Get the authentication cookie for all requests
// const auth = await fetchAuthCookie({ username: 'saldanaj97@gmail.com', password: 'JuaSal97!' })

// // Get the current seasons series data (more generalized data such as series ID, name, licenses etc..)
// const generalizedSeriesData = await getSeriesData()
// writeDataToFile({
//   jsonData: JSON.stringify(generalizedSeriesData),
//   fileDir: './src/__mocks__/test-data/generalizedSeriesData.json',
// })

// // Get the detailed data for the season series
// const detailedSeriesData = await getDetailedSeriesData()
// writeDataToFile({
//   jsonData: JSON.stringify(detailedSeriesData),
//   fileDir: './src/__mocks__/test-data/detailedSeriesData.json',
// })

// // Get the data for each vehicle
// const carData = await getListOfAllCars()
// writeDataToFile({ jsonData: JSON.stringify(carData), fileDir: './src/__mocks__/test-data/carList.json' })

// // Get all the tracks offered in the game
// const trackData = await getTrackData()
