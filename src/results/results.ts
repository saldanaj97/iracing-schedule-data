import { appendParams } from "../utils/appendParams"
import { client } from "../utils/axiosSetup"
import { dateParamErrorChecking } from "../utils/errorChecking"
import type { SearchHostedResults, SearchSeriesResults } from "./types"

/**
 * Get the results of a subsession, if authorized to view them. series_logo image paths are relative to https://images-static.iracing.com/img/logos/series/
 *
 * Example Usage:
 *
 * ```typescript
 * getSubsessionResults({subsession_id: 12345, included_licenses: true}) // Returns the results of the subsession.
 * ```
 *
 * Required Params:
 * @param subsession_id - The ID of the subsession to get results for.
 *
 * Optional Params:
 * @param included_licenses - Whether or not to include license data in the response.
 */
export const getSubsessionResults = async ({
  subsession_id,
  included_licenses,
}: {
  subsession_id: number
  included_licenses?: boolean
}) => {
  if (!subsession_id) throw new Error("Cannot complete request: Missing required parameters (subsession_id)")
  const URL = appendParams("https://members-ng.iracing.com/data/results/get?", { subsession_id, included_licenses })
  console.log(`Attempting to retrieve subsession results from ${URL}\n`)
  try {
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Get the event log of the provided subsession.
 *
 * Example Usage:
 * ```typescript
 * getSubsessionEventLog({subsession_id: 12345, simsession_number: 0}) // Returns the event log for the subsession.
 * ```
 *
 * Required Params:
 * @param subsession_id - The ID of the subsession to get the event log for.
 * @param simsession_number - The simsession number to get the event log for. The main event is 0; the preceding event is -1, and so on.
 */
export const getSubsessionEventLog = async ({
  subsession_id,
  simsession_number,
}: {
  subsession_id: number
  simsession_number: number
}) => {
  if (!subsession_id || !simsession_number)
    throw new Error("Cannot complete request: Missing required parameters (subsession_id, simsession_number)")
  const URL = appendParams("https://members-ng.iracing.com/data/results/event_log?", {
    subsession_id,
    simsession_number,
  })
  console.log(`Attempting to retrieve subsession event log from ${URL}\n`)
  try {
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    if (data.success) return data
    throw new Error("Failed to retrieve event log data")
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Get the lap chart data for the provided subsession.
 *
 * Example Usage:
 * ```typescript
 * getSubsessionLapChartData({subsession_id: 12345, simsession_number: 0}) // Returns the lap chart data
 * ```
 *
 * Required Params:
 * @param subsession_id - The ID of the subsession to get the event log for.
 * @param simsession_number - The simsession number to get the event log for. The main event is 0; the preceding event is -1, and so on.
 */
export const getSubsessionLapChartData = async ({
  subsession_id,
  simsession_number,
}: {
  subsession_id: number
  simsession_number: number
}) => {
  if (!subsession_id || !simsession_number)
    throw new Error("Cannot complete request: Missing required parameters (subsession_id, simsession_number)")
  const URL = appendParams("https://members-ng.iracing.com/data/results/lap_chart_data?", {
    subsession_id,
    simsession_number,
  })
  console.log(`Attempting to retrieve subsession lap chart data from ${URL}\n`)
  try {
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Get the lap chart data for the provided subsession.
 *
 * Example Usage:
 * ```typescript
 * getSubsessionLapData({subsession_id: 12345, simsession_number: 0, cust_id: 123456}) // Returns the lap chart data
 * ```
 *
 * Required Params:
 * @param subsession_id - The ID of the subsession to get the event log for.
 * @param simsession_number - The simsession number to get the event log for. The main event is 0; the preceding event is -1, and so on.
 * @param cust_id - Required if the subsession was a single-driver event. Optional for team events. Required if the subsession was a single-driver event. Optional for team events. If omitted for a team event then the laps driven by all the team's drivers will be included.
 * @param team_id - Required if subsession was a team event
 */
export const getLapData = async ({
  subsession_id,
  simsession_number,
  cust_id,
  team_id,
}: {
  subsession_id: number
  simsession_number: number
  cust_id?: number
  team_id?: number
}) => {
  if (!subsession_id || !simsession_number)
    throw new Error("Cannot complete request: Missing required parameters (subsession_id, simsession_number)")
  const URL = appendParams("https://members-ng.iracing.com/data/results/lap_data?", { cust_id, team_id })
  console.log(`Attempting to retrieve lap data from ${URL}\n`)
  try {
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Get the lap chart data for the provided subsession. One of the primary filters needs to be included. Primary filters include host, driver, team, or session name.
 *
 * Hosted and league sessions.  Maximum time frame of 90 days. Results split into one or more files with chunks of results.
 *
 * For scraping results the most effective approach is to keep track of the maximum end_time found during
 * a search then make the subsequent call using that date/time as the finish_range_begin and skip any subsessions that are duplicated.
 * Results are ordered by subsessionid which is a proxy for start time. Requires one of: start_range_begin, finish_range_begin.
 * Requires one of: cust_id, team_id, host_cust_id, session_name.
 *
 * Example Usage:
 * ```typescript
 * // Returns hosted session data for the host with customer ID 345352.
 * searchHostedSeriesResults({
 *  host_cust_id: 345352,
 *  start_range_begin: "2024-02-01T00:00:00Z",
 *  start_range_end: "2024-03-31T00:00:00Z",
 *  finish_range_begin: "2024-02-01T00:00:00Z",
 *  finish_range_end: "2024-03-31T00:00:00Z"
 * })
 * ```
 *
 * Required Params:
 * @param cust_id - Include only sessions in which this customer participated. Ignored if team_id is supplied.
 * @param team_id - Include only sessions in which this team participated. Takes priority over cust_id if both are supplied.
 * @param host_cust_id - The host's customer ID.
 * @param session_name - Part or all of the session's name.
 *
 * Optional Params:
 * @param start_range_begin - Session start times. ISO-8601 UTC time zero offset: "2022-04-01T15:45Z".
 * @param start_range_end - ISO-8601 UTC time zero offset: "2022-04-01T15:45Z". Exclusive. May be omitted if start_range_begin is less than 90 days in the past.
 * @param finish_range_begin - 'Session finish times. ISO-8601 UTC time zero offset: "2022-04-01T15:45Z".
 * @param finish_range_end - ISO-8601 UTC time zero offset: "2022-04-01T15:45Z". Exclusive. May be omitted if finish_range_begin is less than 90 days in the past.
 * @param league_id - Include only sessions for this league.
 * @param league_session_id - Include only sessions for the league session with this ID.
 * @param car_id - One of the cars used by the session.
 * @param track_id - The ID of the track used by the session.
 * @param category_ids - License categories to include in the search.  Defaults to all. (ex. ?category_ids=1,2,3,4)
 */
export const searchHostedSeriesResults = async ({
  start_range_begin,
  start_range_end,
  finish_range_begin,
  finish_range_end,
  cust_id,
  team_id,
  host_cust_id,
  session_name,
  league_id,
  league_session_id,
  car_id,
  track_id,
  category_ids,
}: {
  start_range_begin?: string
  start_range_end?: string
  finish_range_begin?: string
  finish_range_end?: string
  cust_id?: number
  team_id?: number
  host_cust_id?: number
  session_name?: number
  league_id?: number
  league_session_id?: number
  car_id?: number
  track_id?: number
  category_ids?: number
}): Promise<SearchHostedResults | undefined> => {
  let URL = "https://members-ng.iracing.com/data/results/search_hosted?"

  if (!cust_id && !team_id && !host_cust_id && !session_name) {
    throw new Error(
      "Cannot complete request. Missing required parameters. At least of the following is required: cust_id, team_id, host_cust_id, session_name."
    )
  }

  // First append one of the required params
  const requiredParams = {
    cust_id,
    team_id,
    host_cust_id,
    session_name,
  }
  URL = appendParams(URL, requiredParams)

  // Error checking for dates
  if (dateParamErrorChecking({ start_range_begin, start_range_end, finish_range_begin, finish_range_end }) === "PASS") {
    if (start_range_begin && start_range_end) {
      URL += `&start_range_begin=${start_range_begin}&start_range_end=${start_range_end}`
    }
    if (finish_range_begin && finish_range_end) {
      URL += `&finish_range_begin=${finish_range_begin}&finish_range_end=${finish_range_end}`
    }
  }

  // Next add the rest of the params if available
  const params = {
    league_id,
    league_session_id,
    car_id,
    track_id,
    category_ids,
  }
  URL = appendParams(URL, params)

  console.log(`Attempting to retrieve hosted series results from ${URL}\n`)
  try {
    const data = await client.get(URL).then((res) => res.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Get the lap chart data for the provided subsession. Official series.  Maximum time frame of 90 days. Results split into one or more files with chunks of results.
 *
 * This request can take a bit of time to process and return the link to the results. A recommendation would be to make the URL yourself, and then use the link to get the data to verify
 * that the data is what you are looking for.
 *
 * For scraping results, the most effective approach is to keep track of the maximum end_time found during a
 * search then make the subsequent call using that date/time as the finish_range_begin and skip any subsessions that are duplicated.  Results are ordered by
 * subsessionid which is a proxy for start time but groups together multiple splits of a series when multiple series launch sessions at the same time.
 * Requires at least one of: season_year and season_quarter, start_range_begin, finish_range_begin.
 *
 * Example Usage:
 * ```typescript
 * // Returns all session data for customer 123456 in the 2024 season 2nd quarter.
 * getSearchSeriesResults({season_year: 2024, season_quarter: 2, cust_id: 123456})
 * ```
 *
 * Required Params:
 * @param season_year - The year of the season to get the event log for. Required only when using season_quarter.
 * @param season_quarter - The quarter of the year to get the event log for. Required only when using season_year.
 *
 * Optional Params:
 * @param cust_id - Include only sessions in which this customer participated. Ignored if team_id is supplied.
 * @param team_id - Include only sessions in which this team participated. Takes priority over cust_id if both are supplied.
 * @param start_range_begin - Session start times. ISO-8601 UTC time zero offset: "2022-04-01T15:45Z".
 * @param start_range_end - ISO-8601 UTC time zero offset: "2022-04-01T15:45Z". Exclusive. May be omitted if start_range_begin is less than 90 days in the past.
 * @param finish_range_begin - 'Session finish times. ISO-8601 UTC time zero offset: "2022-04-01T15:45Z".
 * @param finish_range_end - ISO-8601 UTC time zero offset: "2022-04-01T15:45Z". Exclusive. May be omitted if finish_range_begin is less than 90 days in the past.
 * @param series_id - Include only sessions for series with this ID.
 * @param race_week_num - Include only sessions with this race week number.
 * @param official_only - If true, include only sessions earning championship points. Defaults to all.
 * @param event_types - Types of events to include in the search. Defaults to all. (ex. ?event_types=2,3,4,5)
 * @param category_ids - License categories to include in the search.  Defaults to all. (ex. ?category_ids=1,2,3,4)
 */
export const getSearchSeriesResults = async ({
  season_year,
  season_quarter,
  start_range_begin,
  start_range_end,
  finish_range_begin,
  finish_range_end,
  cust_id,
  team_id,
  series_id,
  race_week_num,
  official_only,
  event_types,
  category_ids,
}: {
  season_year?: number
  season_quarter?: number
  start_range_begin?: string
  start_range_end?: string
  finish_range_begin?: string
  finish_range_end?: string
  cust_id?: number
  team_id?: number
  series_id?: number
  race_week_num?: number
  official_only?: boolean
  event_types?: number[]
  category_ids?: number[]
}): Promise<SearchSeriesResults | undefined> => {
  let URL = `https://members-ng.iracing.com/data/results/search_series`

  // Error checking for required params
  if (!((season_year !== undefined && season_quarter !== undefined) || (start_range_begin && finish_range_begin))) {
    throw new Error(
      "At least one of the following pairs is required: season_year and season_quarter, start_range_begin, finish_range_begin."
    )
  }

  // Make sure if season_year is provided then season_quarter is also provided and vice versa
  if ((season_year !== undefined) !== (season_quarter !== undefined)) {
    const errorMessage = season_year === undefined ? "season_year" : "season_quarter"
    throw new Error(`${errorMessage} is required when using the other.`)
  }

  // Append the season_year and season_quarter to the URL
  if (season_year !== undefined && season_quarter !== undefined) {
    URL += `?season_year=${season_year}&season_quarter=${season_quarter}`
  }

  // Error checking for dates
  if (dateParamErrorChecking({ start_range_begin, start_range_end, finish_range_begin, finish_range_end }) === "PASS") {
    if (start_range_begin && start_range_end) {
      URL += `&start_range_begin=${start_range_begin}&start_range_end=${start_range_end}`
    }
    if (finish_range_begin && finish_range_end) {
      URL += `&finish_range_begin=${finish_range_begin}&finish_range_end=${finish_range_end}`
    }
  }

  // Append the rest of the params
  const params = {
    cust_id,
    team_id,
    series_id,
    race_week_num,
    official_only: official_only ? 1 : undefined,
    event_types: event_types ? event_types.join(",") : undefined,
    category_ids: category_ids ? category_ids.join(",") : undefined,
  }
  URL = appendParams(URL, params)

  console.log(`Attempting to retrieve series results from ${URL}\n`)
  try {
    const data = await client.get(URL).then((res) => res.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Get the lap chart data for the provided subsession.
 *
 * Example Usage:
 * ```typescript
 * getSeasonResults({season_id: 12345, event_type: 5, race_week_num: 0}) // Returns the lap chart data
 * ```
 *
 * Required Params:
 * @param season_id - The ID of the season to get the results for.
 *
 * Optional Params:
 * @param event_type - Retrict to one event type: 2 - Practice; 3 - Qualify; 4 - Time Trial; 5 - Race.
 * @param race_week_num - The first race week of the season is 0.
 */
export const getSeasonResults = async ({
  season_id,
  event_type,
  race_week_num,
}: {
  season_id: number
  event_type?: number
  race_week_num?: number
}) => {
  if (!season_id) throw new Error("Cannot complete request: Missing required parameter (season_id)")
  const URL = appendParams("https://members-ng.iracing.com/data/results/season_results?", {
    season_id,
    event_type,
    race_week_num,
  })
  console.log(`Attempting to retrieve season results from ${URL}\n`)
  try {
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}
