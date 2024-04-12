import Axios from "axios"
import { wrapper } from "axios-cookiejar-support"
import dotenv from "dotenv"
import fs from "fs"
import { dirname } from "path"
import { CookieJar } from "tough-cookie"
import { Car, ConstantType, HostedSession, RacingSeason, Series, Track } from "./types"

import CryptoJS from "crypto-js"

// ENV for test environment
dotenv.config()

// Save the cookie-jar for every req
const jar = new CookieJar()
const client = wrapper(
  Axios.create({
    jar,
  })
)

/**
 * Function that will authenticate with iRacing API for any subsequent requests
 * @return Returns a token for the cookie-jar
 */
export const fetchAuthCookie = async ({ username, password }: { username: string; password: string }) => {
  // Hash the password as instructed from iRacing team here: https://forums.iracing.com/discussion/15068/general-availability-of-data-api/p1
  const hash = CryptoJS.SHA256(password + username.toLowerCase())
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash)

  // Make the request to the link provided in the docs and retrieve the cookie data for subsequent requests
  try {
    console.log("\nAttempting to authenticate with iRacing API...\n")
    const { data } = await client.post("https://members-ng.iracing.com/auth", {
      email: username,
      password: hashInBase64,
    })
    if (data.authcode === 0) throw new Error(`Failed to authenticate with iRacing API. ${data.message}\n`)
    console.log("\nSuccessfully authenticated with iRacing API\n")
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Function to get series data current season (not as much detail as the get series data function)
 * @returns BASIC data about every active series in this season
 */
export const getAllSeriesInCurrentSeason = async (): Promise<Series[] | Error> => {
  const URL = `https://members-ng.iracing.com/data/series/get`
  try {
    const { link } = await client.get(URL).then((response) => response.data)
    const { data } = await client.get(link).then((response) => response.data)
    return data
  } catch (error) {
    return error as Error
  }
}

/**
 * Retrieves the detailed season series data for EVERY series in the current season.
 * @returns The season series data.
 */
export const getDetailedSeriesData = async (): Promise<RacingSeason[] | undefined> => {
  try {
    const URL = "https://members-ng.iracing.com/data/series/seasons?include_series=1"
    const { link } = (await client.get(URL)).data

    const seasonSeriesData: RacingSeason[] = []

    for (const series of (await client.get(link)).data) {
      const {
        active,
        car_class_ids,
        car_switching,
        car_types,
        caution_laps_do_not_count,
        complete,
        cross_license,
        driver_change_rule,
        driver_changes,
        drops,
        enable_pitlane_collisions,
        fixed_setup,
        green_white_checkered_limit,
        grid_by_class,
        hardcore_level,
        has_supersessions,
        ignore_license_for_practice,
        incident_limit,
        incident_warn_mode,
        incident_warn_param1,
        incident_warn_param2,
        is_heat_racing,
        license_group,
        license_group_types,
        lucky_dog,
        max_team_drivers,
        max_weeks,
        min_team_drivers,
        multiclass,
        must_use_diff_tire_types_in_race,
        next_race_session,
        num_opt_laps,
        official,
        op_duration,
        open_practice_session_type_id,
        qualifier_must_start_race,
        race_week,
        race_week_to_make_divisions,
        reg_user_count,
        region_competition,
        restrict_by_member,
        restrict_to_car,
        restrict_viewing,
        schedule_description,
        schedules,
        season_id,
        season_name,
      } = series

      seasonSeriesData.push({
        active,
        car_class_ids,
        car_switching,
        car_types,
        caution_laps_do_not_count,
        complete,
        cross_license,
        driver_change_rule,
        driver_changes,
        drops,
        enable_pitlane_collisions,
        fixed_setup,
        green_white_checkered_limit,
        grid_by_class,
        hardcore_level,
        has_supersessions,
        ignore_license_for_practice,
        incident_limit,
        incident_warn_mode,
        incident_warn_param1,
        incident_warn_param2,
        is_heat_racing,
        license_group,
        license_group_types,
        lucky_dog,
        max_team_drivers,
        max_weeks,
        min_team_drivers,
        multiclass,
        must_use_diff_tire_types_in_race,
        next_race_session,
        num_opt_laps,
        official,
        op_duration,
        open_practice_session_type_id,
        qualifier_must_start_race,
        race_week,
        race_week_to_make_divisions,
        reg_user_count,
        region_competition,
        restrict_by_member,
        restrict_to_car,
        restrict_viewing,
        schedule_description,
        schedules,
        season_id,
        season_name,
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
 * @returns A list containing each cars id and the corresponding vehicle in natural language
 */
export const getListOfAllCars = async (): Promise<Car[] | undefined> => {
  try {
    const URL = "https://members-ng.iracing.com/data/carclass/get"
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
    return listOfAvailableCars
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Function that will grab all the tracks available on the service
 * @returns A list containing each track with its id, name, and category
 */
export const getTrackData = async (): Promise<Track[] | undefined> => {
  const trackData: Track[] = []
  const seen: Set<string> = new Set()
  try {
    const URL = "https://members-ng.iracing.com/data/track/get"
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
 * Function that will grab all the constants available on the API
 * @param constant - The constant you want to retrieve (categories, car_classes, event_types)
 * @returns A list containing each constant and its corresponding value
 */
export const getConstants = async ({
  constant,
}: {
  constant: "categories" | "car_classes" | "event_types"
}): Promise<ConstantType[] | undefined> => {
  const URL = `https://members-ng.iracing.com/data/constants/${constant}`
  console.log(URL)
  try {
    const constants = await client.get(URL).then((response) => response.data)
    return constants
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Function to retrieve hosted sessions.
 * @param {number} [package_id] - If set, returns only sessions using this car or track package ID (per the official API docs).
 * @param {string} [session_type] - The type of session to retrieve.
 *   - `sessions`: Returns all sessions that can be joined as a driver, excluding spectator and non-league pending sessions for the user.
 *   - `combined_sessions`: Returns sessions that can be joined as a driver or spectator, including non-league pending sessions for the user.
 * @returns {Promise<HostedSession[] | undefined>} A list of sessions that can be joined as a driver or spectator, including non-league pending sessions for the user.
 */
export const getHostedSessions = async ({
  package_id,
  session_type,
}: {
  package_id?: number
  session_type: "sessions" | "combined_sessions"
}): Promise<HostedSession[] | undefined> => {
  // TODO: Add support for packacge_id param
  const URL = `https://members-ng.iracing.com/data/hosted/${session_type}`
  try {
    const { link } = await client.get(URL).then((response) => response.data)
    const data = await client.get(link).then((response) => response.data)
    return data
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

const main = async () => {
  const username = process.env.IRACING_USERNAME
  const password = process.env.IRACING_PASSWORD

  if (!username || !password) {
    console.error("Please provide a username and password in the .env file")
    return
  }

  const authData = await fetchAuthCookie({ username: "saldanaj97@gmail.com", password: "JuaSal97!" })
  if (!authData) return

  // const seriesData = await getDetailedSeriesData()
  // if (!seriesData) return

  // const allCars = await getListOfAllCars()
  // if (!allCars) return

  // const allTracks = await getTrackData()
  // if (!allTracks) return

  //const constants = await getConstants({ constant: "event_types" })
  // if (!constants) return

  // const hostedSessions = await getHostedSessions({ session_type: "sessions" })
  // if (!hostedSessions) return
}

main()
