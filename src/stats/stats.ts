import { appendParams } from "../utils/appendParams"
import { client } from "../utils/axiosSetup"
import {
  DivisionData,
  MemberBests,
  MemberCareer,
  MemberRecap,
  MemberSummary,
  MemberYearlySummary,
  RecentRaces,
  SeasonResults,
  SeasonStandings,
} from "./types"

/**
 * Retrieve member bests stats. If you want to retrieve stats for a specific car, irst call should exclude car_id;
 * use cars_driven list in return for subsequent calls.
 *
 * Example Usage:
 * ```typescript
 * const memberStats = await getMemberBests() // Return member best lap times
 * ```
 *
 * Required Params:
 * @param member_id - Defaults to the authenticated member
 * @param car_id - First call should exclude car_id; use cars_driven list in return for subsequent calls.
 */
export const getMemberBests = async ({
  member_id,
  car_id,
}: {
  member_id?: number
  car_id?: number
}): Promise<MemberBests | undefined> => {
  const URL = appendParams("https://members-ng.iracing.com/data/stats/member_bests?", { member_id, car_id })
  console.log(`Attempting to retrieve member bests stats from ${URL}`)
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
 * Retrieve members career stats. Defaults ot the authenticated member but member_id can be passed to retrieve stats for another member.
 *
 * Example Usage:
 * ```typescript
 * const memberStats = await getMemberCareerStats() // Return member career stats
 * ```
 *
 * Optional Params:
 * @param member_id - Defaults to the authenticated member
 */
export const getMemberCareerStats = async ({
  member_id,
}: {
  member_id?: number
}): Promise<MemberCareer | undefined> => {
  const URL = appendParams("https://members-ng.iracing.com/data/stats/member_career?", { member_id })
  console.log(`Attempting to retrieve member career stats from ${URL}`)
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
 * Retireve member division. Divisions are 0-based: 0 is Division 1, 10 is Rookie. See /data/constants/divisons for more information. Always for the authenticated member.
 *
 * Example Usage:
 * ```typescript
 * const memberDivisonStats = await getMemberDivisionStats() // Return member division stats
 * ```
 *
 * Required Params:
 * @param season_id - ID of the season you want data for
 * @param event_type - The event type code for the division type: 4 - Time Trial; 5 - Race
 */
export const getMemberDivisionStats = async ({
  season_id,
  event_type,
}: {
  season_id: number
  event_type: number
}): Promise<DivisionData | undefined> => {
  if (!season_id || !event_type)
    throw new Error("Cannot complete request. Missing required parameters. (season_id, event_type)")
  const URL = appendParams("https://members-ng.iracing.com/data/stats/member_division?", { season_id, event_type })
  console.log(`Attempting to retrieve member division stats from ${URL}`)
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
 * Retrieve member recap. Defaults to the authenticated member, but member_id can be passed to retrieve stats for another member.
 *
 * Example Usage:
 * ```typescript
 * const memberRecap = await getMemberRecap() // Return member recap stats
 * ```
 *
 * Optional Params:
 * @param member_id - Defaults to the authenticated member
 * @param year - Season year; if not supplied the current calendar year (UTC) is used.
 * @param quarter - Season (quarter) within the year; if not supplied the recap will be fore the entire year.
 */
export const getMemberRecap = async ({
  member_id,
  year,
  quarter,
}: {
  member_id?: number
  year?: number
  quarter?: number
}): Promise<MemberRecap | undefined> => {
  const URL = appendParams("https://members-ng.iracing.com/data/stats/member_recap?", { member_id, year, quarter })
  console.log(`Attempting to retrieve member recap from ${URL}`)
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
 * Retrieve a members recent races. Defaults to the authenticated member, but member_id can be passed to retrieve stats for another member.
 *
 * Example Usage:
 * ```typescript
 * const recentRaces = await getRecentRaces({cust_id: 123456}) // Return recent races for member 123456
 * ```
 *
 * Optional Params:
 * @param cust_id - Defaults to the authenticated member
 */
export const getRecentRaces = async ({ cust_id }: { cust_id?: number }): Promise<RecentRaces | undefined> => {
  const URL = appendParams("https://members-ng.iracing.com/data/stats/member_recent_races?", { cust_id })
  console.log(`Attempting to retrieve members recent races from ${URL}`)
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
 * Retrieve member summary. Defaults to the authenticated member, but member_id can be passed to retrieve stats for another member.
 *
 * Example Usage:
 * ```typescript
 * const memberSummary = await getMemberSummary({cust_id: 123456}) // Return member summary for member 123456
 * ```
 *
 * Optional Params:
 * @param cust_id - Defaults to the authenticated member
 */
export const getMemberSummary = async ({ cust_id }: { cust_id?: number }): Promise<MemberSummary | undefined> => {
  const URL = appendParams("https://members-ng.iracing.com/data/stats/member_summary?", { cust_id })
  console.log(`Attempting to retrieve members race summaries from ${URL}`)
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
 * Retrieve member summary. Defaults to the authenticated member, but member_id can be passed to retrieve stats for another member.
 *
 * Example Usage:
 * ```typescript
 * const memberSummary = await getMemberSummary({cust_id: 123456}) // Return member summary for member 123456
 * ```
 *
 * Optional Params:
 * @param cust_id - Defaults to the authenticated member
 */
export const getYearlyStats = async ({ cust_id }: { cust_id?: number }): Promise<MemberYearlySummary | undefined> => {
  const URL = appendParams("https://members-ng.iracing.com/data/stats/member_yearly?", { cust_id })
  console.log(`Attempting to retrieve members yearly race stats from ${URL}`)
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
 * Retrieve season driver standings. A base_download_url will be returned along with a list of chunk file names, which can be used to download the data. Simply
 * attach the chunk file name to the base_download_url to download the file.
 *
 * Example Usage:
 * ```typescript
 * // Return season driver standings for season 1234 and car class 1234
 * const seasonDriverStandings = await getSeasonDriverStandings({season_id: 4603, car_class_id: 870})
 * ```
 *
 * Required Params:
 * @param season_id - ID of the season you want data for
 * @param car_class_id - ID of the car class you want data for
 *
 * Optional Params:
 * @param club_id - ID of the club you want data for. Defaults to all (-1).
 * @param division - Division you want data for. Divisions are 0-based: 0 is Division 1, 10 is Rookie. See /data/constants/divisons for more information. Defaults to all.
 * @param race_week_num - Number of the race week. The first race week of a season is 0.
 */
export const getSeasonDriverStandings = async ({
  season_id,
  car_class_id,
  club_id = -1,
  division,
  race_week_num,
}: {
  season_id: number
  car_class_id: number
  club_id?: number
  division?: number
  race_week_num?: number
}): Promise<SeasonStandings | undefined> => {
  if (!season_id || !car_class_id)
    throw new Error("Cannot complete request. Missing required parameters. (season_id, car_class_id)")
  const URL = appendParams("https://members-ng.iracing.com/data/stats/season_driver_standings?", {
    season_id,
    car_class_id,
    club_id,
    division,
    race_week_num,
  })
  console.log(`Attempting to retrieve season driver standings from ${URL}`)
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
 * Retrieve seasons supersession standings. A base_download_url will be returned along with a list of chunk file names, which can be used to download the data. Simply
 * attach the chunk file name to the base_download_url to download the file.
 *
 * Example Usage:
 * ```typescript
 * // Return season driver standings for season 1234 and car class 1234
 * const supersessionStandings = await getSeasonSupersesssionStandings({season_id: 1234, car_class_id: 1234})
 * ```
 *
 * Required Params:
 * @param season_id - ID of the season you want data for
 * @param car_class_id - ID of the car class you want data for
 *
 * Optional Params:
 * @param club_id - ID of the club you want data for. Defaults to all (-1).
 * @param division - Division you want data for. Divisions are 0-based: 0 is Division 1, 10 is Rookie. See /data/constants/divisons for more information. Defaults to all.
 * @param race_week_num - Number of the race week. The first race week of a season is 0.
 */
export const getSeasonSupersesssionStandings = async ({
  season_id,
  car_class_id,
  club_id = -1,
  division,
  race_week_num,
}: {
  season_id: number
  car_class_id: number
  club_id?: number
  division?: number
  race_week_num?: number
}): Promise<SeasonStandings | undefined> => {
  if (!season_id || !car_class_id)
    throw new Error("Cannot complete request. Missing required parameters. (season_id, car_class_id)")
  const URL = appendParams("https://members-ng.iracing.com/data/stats/season_supersession_standings?", {
    season_id,
    car_class_id,
    club_id,
    division,
    race_week_num,
  })
  console.log(`Attempting to retrieve supersession standings from ${URL}`)
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
 * Retrieve season team standings. A base_download_url will be returned along with a list of chunk file names, which can be used to download the data. Simply
 * attach the chunk file name to the base_download_url to download the file.
 *
 * Example Usage:
 * ```typescript
 * const seasonTeamStandings = await getSeasonTeamStandings({season_id: 1234, car_class_id: 123}) // Return team standings for season 1234 and car class 123
 * ```
 *
 * Required Params:
 * @param season_id - ID of the season you want data for
 * @param car_class_id - ID of the car class you want data for
 *
 * Optional Params:
 * @param race_week_num - Number of the race week. The first race week of a season is 0.
 */
export const getSeasonTeamStandings = async ({
  season_id,
  car_class_id,
  race_week_num,
}: {
  season_id: number
  car_class_id: number
  race_week_num?: number
}): Promise<SeasonStandings | undefined> => {
  if (!season_id || !car_class_id)
    throw new Error("Cannot complete request. Missing required parameters. (season_id, car_class_id)")
  const URL = appendParams("https://members-ng.iracing.com/data/stats/season_team_standings?", {
    season_id,
    car_class_id,
    race_week_num,
  })
  console.log(`Attempting to retrieve team standings from ${URL}`)
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
 * Retrieve season time trial standings. A base_download_url will be returned along with a list of chunk file names, which can be used to download the data. Simply
 * attach the chunk file name to the base_download_url to download the file.
 *
 * Example Usage:
 * ```typescript
 * // Return season time trial season standings for season 4603 and car class 870
 * const timeTrialStandings = await getSeasonTimetrialStandings({season_id: 4603, car_class_id: 870 })
 * ```
 *
 * Required Params:
 * @param season_id - ID of the season you want data for
 * @param car_class_id - ID of the car class you want data for
 *
 * Optional Params:
 * @param club_id - ID of the club you want data for. Defaults to all (-1).
 * @param division - Division you want data for. Divisions are 0-based: 0 is Division 1, 10 is Rookie. See /data/constants/divisons for more information. Defaults to all.
 * @param race_week_num - Number of the race week. The first race week of a season is 0.
 */
export const getSeasonTimetrialStandings = async ({
  season_id,
  car_class_id,
  club_id = -1,
  division,
  race_week_num,
}: {
  season_id: number
  car_class_id: number
  club_id?: number
  division?: number
  race_week_num?: number
}): Promise<SeasonStandings | undefined> => {
  if (!season_id || !car_class_id)
    throw new Error("Cannot complete request. Missing required parameters. (season_id, car_class_id)")
  const URL = appendParams("https://members-ng.iracing.com/data/stats/season_tt_standings?", {
    season_id,
    car_class_id,
    club_id,
    division,
    race_week_num,
  })
  console.log(`Attempting to retrieve time trial standings from ${URL}`)
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
 * Retrieve season time trial results. A base_download_url will be returned along with a list of chunk file names, which can be used to download the data. Simply
 * attach the chunk file name to the base_download_url to download the file.
 *
 * Example Usage:
 * ```typescript
 * // Return time trials results for season 4603, car class 870, and race week 0
 * const timetrialResults = await getSeasonTimetrialResults({season_id: 4603, car_class_id: 870, race_week_num: 0 })
 * ```
 *
 * Required Params:
 * @param season_id - ID of the season you want data for
 * @param car_class_id - ID of the car class you want data for
 * @param race_week_num - Number of the race week. The first race week of a season is 0.

 *
 * Optional Params:
 * @param club_id - ID of the club you want data for. Defaults to all (-1).
 * @param division - Division you want data for. Divisions are 0-based: 0 is Division 1, 10 is Rookie. See /data/constants/divisons for more information. Defaults to all.
 */
export const getSeasonTimetrialResults = async ({
  season_id,
  car_class_id,
  race_week_num,
  club_id = -1,
  division,
}: {
  season_id: number
  car_class_id: number
  race_week_num: number
  club_id?: number
  division?: number
}): Promise<SeasonResults | undefined> => {
  if (!season_id || !car_class_id || !race_week_num)
    throw new Error("Cannot complete request. Missing required parameters. (season_id, car_class_id, race_week_num)")
  const URL = appendParams("https://members-ng.iracing.com/data/stats/season_tt_results?", {
    season_id,
    car_class_id,
    club_id,
    division,
    race_week_num,
  })
  console.log(`Attempting to retrieve time trial results from ${URL}`)
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
 * Retrieve season qualifying results. A base_download_url will be returned along with a list of chunk file names, which can be used to download the data. Simply
 * attach the chunk file name to the base_download_url to download the file.
 *
 * Example Usage:
 * ```typescript
 * // Return time trials results for season 4603, car class 870, and race week 0
 * const qualyfyingResults = await getSeasonQualifyingResults({season_id: 4603, car_class_id: 870, race_week_num: 0 })
 * ```
 *
 * Required Params:
 * @param season_id - ID of the season you want data for
 * @param car_class_id - ID of the car class you want data for
 * @param race_week_num - Number of the race week. The first race week of a season is 0.

 *
 * Optional Params:
 * @param club_id - ID of the club you want data for. Defaults to all (-1).
 * @param division - Division you want data for. Divisions are 0-based: 0 is Division 1, 10 is Rookie. See /data/constants/divisons for more information. Defaults to all.
 */
export const getSeasonQualifyingResults = async ({
  season_id,
  car_class_id,
  race_week_num,
  club_id = -1,
  division,
}: {
  season_id: number
  car_class_id: number
  race_week_num: number
  club_id?: number
  division?: number
}): Promise<SeasonResults | undefined> => {
  if (!season_id || !car_class_id || !race_week_num)
    throw new Error("Cannot complete request. Missing required parameters. (season_id, car_class_id, race_week_num)")
  const URL = appendParams("https://members-ng.iracing.com/data/stats/season_qualify_results?", {
    season_id,
    car_class_id,
    race_week_num,
    club_id,
    division,
  })
  console.log(`Attempting to retrieve qualifying results from ${URL}`)
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
 * Retrieve world records. A base_download_url will be returned along with a list of chunk file names, which can be used to download the data. Simply
 * attach the chunk file name to the base_download_url to download the file.
 *
 * Example Usage:
 * ```typescript
 * // Return time trials results for season 4603, car class 870, and race week 0
 * const timetrialResults = await getSeasonTimetrialResults({season_id: 4603, car_class_id: 870, race_week_num: 0 })
 * ```
 *
 * Required Params:
 * @param car_id - ID of the car you want world record data for
 * @param track_id - ID of the track you want data for
 *
 * Optional Params:
 * @param season_year - Limit best time to a given year
 * @param season_quarter - Limit best times to a given quarter; only applicable when year is used.
 */
export const getWorldRecords = async ({
  car_id,
  track_id,
  season_year,
  season_quarter,
}: {
  car_id: number
  track_id: number
  season_year?: number
  season_quarter?: number
}): Promise<any | undefined> => {
  if (!car_id || !track_id) throw new Error("Cannot complete request. Missing required parameters. (car_id, track_id)")
  const URL = appendParams("https://members-ng.iracing.com/data/stats/world_records?", {
    car_id,
    track_id,
    season_year,
    season_quarter,
  })
  console.log(`Attempting to retrieve world records from ${URL}`)
  try {
    const { link } = await client.get(URL).then((response) => response.data)
    const data = await client.get(link).then((response) => response.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}
