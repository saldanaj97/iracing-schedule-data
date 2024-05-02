import { client } from "../auth/axiosSetup"
import { appendParams } from "../utils/appendParams"
import {
  CustomLeagueSession,
  LeagueData,
  LeagueInfo,
  LeagueSeason,
  LeagueSessionData,
  LeagueStandings,
  PointsSystemsData,
} from "./types"

/**
 * Function to retrieve hosted sessions.
 *
 * Example usage:
 * ```typescript
 * getHostedSessions({ mine: true }) //  Returns only sessions created by the user
 * or
 * getHostedSessions({ }) //  Returns all league sessions
 * ```
 *
 * Optional Params:
 * @param {boolean} [mine] - If true, returns only sessions created by the user.
 * @param {number} [package_id] - If set, returns only sessions using this car or track package ID (per the official API docs).
 */
export const getCustomLeagueSession = async ({
  mine,
  package_id,
}: {
  mine?: boolean
  package_id?: number
}): Promise<CustomLeagueSession | undefined> => {
  let URL = `https://members-ng.iracing.com/data/league/cust_league_sessions`
  console.log(`Attempting to retrieve league sessions from ${URL}\n`)
  try {
    if (mine) URL += `?mine=1`
    if (package_id) URL += `?package_id=${package_id}`
    const { link } = await client.get(URL).then((response) => response.data)
    const data = await client.get(link).then((response) => response.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Retrieve league directory info with OPTIONAL parameters in the form of an object.
 *
 * Example usage:
 * ```typescript
 * getLeagueDirectory({}) // Returns all leagues
 * or
 * getLeagueDirectory({ search: "NASCAR"}) // Returns all leagues with "NASCAR" in the name, description, owner, or league ID.
 * ```
 *
 * Optional Params (only choose one for now):
 * - `search`: Will search against league name, description, owner, and league ID.
 * - `tag`: One or more tags, comma-separated.
 * - `restrict_to_member`: If true include only leagues for which customer is a member.
 * - `restrict_to_recruiting`: If true include only leagues which are recruiting.
 * - `restrict_to_friends`: If true include only leagues owned by a friend.
 * - `restrict_to_watched`: If true include only leagues owned by a watched member.
 * - `minimum_roster_count`: If set include leagues with at least this number of members.
 * - `maximum_roster_count`: If set include leagues with no more than this number of members.
 * - `lowerbound`: First row of results to return.  Defaults to 1.
 * - `upperbound`: Last row of results to results to lowerbound + 39.
 * - `sort`: One of relevance, teamname, rostercount. Displayname is owners's name. Defaults to relevance.
 * - `order`: "One of asc or desc.  Defaults to asc.
 */
export const getLeagueDirectory = async ({
  search,
  tag,
  restrict_to_member,
  restrict_to_recruiting,
  restrict_to_friends,
  restrict_to_watched,
  minimum_roster_count,
  maximum_roster_count,
  lowerbound,
  upperbound,
  sort,
  order,
}: {
  search?: string
  tag?: string
  restrict_to_member?: boolean
  restrict_to_recruiting?: boolean
  restrict_to_friends?: boolean
  restrict_to_watched?: boolean
  minimum_roster_count?: number
  maximum_roster_count?: number
  lowerbound?: number
  upperbound?: number
  sort?: string
  order?: string
}): Promise<CustomLeagueSession | undefined> => {
  let URL = "https://members-ng.iracing.com/data/league/directory"

  if (search !== undefined) {
    encodeURIComponent(search)
    URL += `?search=${search}`
  }

  URL = appendParams(URL, {
    tag,
    restrict_to_member,
    restrict_to_recruiting,
    restrict_to_friends,
    restrict_to_watched,
    minimum_roster_count,
    maximum_roster_count,
    lowerbound,
    upperbound,
    sort,
    order,
  })

  console.log(`Attempting to retrieve league directory from ${URL}`)
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
 * Retrieve a specific league by league ID.
 *
 * Example usage:
 * ```typescript
 * getSpecificLeague({ league_id: 12345 }) // Returns the league with the ID of 12345
 * ```
 *
 * Required Params:
 * @param {number} league_id - The ID of the league you want to retrieve.
 *
 * Optional Params:
 * @param {number} include_licenses - For faster responses, only request when necessary. Return licenses for each member.
 */
export const getLeague = async ({
  league_id,
  include_licenses,
}: {
  league_id: number
  include_licenses?: boolean
}): Promise<LeagueInfo | undefined> => {
  if (!league_id) throw new Error("Cannot complete request. Missing required parameters. (league_id)")
  let URL = `https://members-ng.iracing.com/data/league/get?league_id=${league_id}`
  if (include_licenses !== undefined) include_licenses === true ? (URL += `&include_licenses=1`) : null
  console.log(`Attempting to retrieve league from ${URL}\n`)
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
 * Retrieve a specific league by league ID.
 *
 * Example usage:
 * ```typescript
 * getSpecificLeague({ league_id: 12345 }) // Returns the league with the ID of 12345
 *
 * OR
 *
 * getSpecificLeague({ league_id: 12345, season_id: 12345 }) // Returns the league with the ID of 12345 and the season with the ID of 12345
 * ```
 *
 * Required Params:
 * @param {number} league_id - The ID of the league you want to retrieve.
 *
 * Optional Params:
 * @param {number} season_id - If included and the season is using custom points (points_system_id:2) then the custom points option is included in the returned list. Otherwise the custom points option is not returned.
 */
export const getLeaguePointSystem = async ({
  league_id,
  season_id,
}: {
  league_id: number
  season_id?: number
}): Promise<PointsSystemsData | undefined> => {
  if (!league_id) throw new Error("Cannot complete request. Missing required parameters. (league_id)")
  const URL = appendParams(`https://members-ng.iracing.com/data/league/get_points_system?league_id=${league_id}`, {
    season_id,
  })
  console.log(`Attempting to retrieve league point system from ${URL}\n`)

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
 * Retrieve a list of leagues the user owns if not set to private.
 *
 * Example usage:
 * ```typescript
 * getLeaguesOwnedByCustomer({ cust_id: 12345, include_league: true }) // Returns the leagues customer 12345 if the owner of if not set to private
 * ```
 *
 * Required Params:
 * @param {number} cust_id - If different from the authenticated member, the following resrictions apply:
 * - Caller cannot be on requested customer's block list or an empty list will result;
 * - Requested customer cannot have their online activity prefrence set to hidden or an empty list will result;
 * - Only leagues for which the requested customer is an admin and the league roster is not private are returned
 * @param {boolean} include_league - If true, includes the league information in the response.
 */
export const getLeagueMembership = async ({
  cust_id,
  include_league,
}: {
  cust_id: number
  include_league?: boolean
}): Promise<LeagueData | undefined> => {
  if (!cust_id) throw new Error("Cannot complete request. Missing required parameters. (cust_id)")
  let URL = `https://members-ng.iracing.com/data/league/membership?cust_id=${cust_id}`
  if (include_league) URL += `&include_league=1`
  console.log(`Attempting to retrieve league membership from ${URL}\n`)
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
 * Retrieve the seasons for a specific league.
 *
 * Example usage:
 * ```typescript
 * getLeagueSeasons({ league_id: 12345 }) // Returns the seasons for the league with the ID of 12345
 * ```
 *
 * Required Params:
 * @param {number} league_id - The ID of the league you want to retrieve the seasons for.
 *
 * Optional Params:
 * @param {boolean} retired - If true, include retired seasons.
 */
export const getLeagueSeasons = async ({
  league_id,
  retired,
}: {
  league_id: number
  retired?: boolean
}): Promise<LeagueSeason | undefined> => {
  if (!league_id) throw new Error("Cannot complete request. Missing required parameters. (league_id)")
  const URL = appendParams(`https://members-ng.iracing.com/data/league/seasons?league_id=${league_id}`, { retired })
  console.log(`Attempting to retrieve league seasons from ${URL}\n`)
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
 * Retrieve the standings for a specific league and season.
 *
 * Example usage:
 * ```typescript
 * getLeagueSeasonStandings({ league_id: 12345 }) // Returns the sessions for the league with the ID of 12345
 * ```
 *
 * Required Params:
 * @param {number} league_id - The ID of the league you want to retrieve the sessions for.
 * @param {number} season_id - The ID of the season you want to retrieve the sessions for.
 *
 * Optional Params:
 * @param {boolean} car_class_id - The ID of the car class
 * @param {boolean} car_id - If car_class_id is included then the standings are for the car in that car class, otherwise they are for the car across car classes.
 */
export const getLeagueSeasonStandings = async ({
  league_id,
  season_id,
  car_class_id,
  car_id,
}: {
  league_id: number
  season_id: number
  car_class_id?: number
  car_id?: number
}): Promise<LeagueStandings | undefined> => {
  if (!league_id || !season_id)
    throw new Error("Cannot complete request. Missing required parameters. (league_id, season_id)")
  const URL = appendParams(
    `https://members-ng.iracing.com/data/league/season_standings?league_id=${league_id}&season_id=${season_id}`,
    {
      car_class_id,
      car_id,
    }
  )
  console.log(`Attempting to retrieve league season standings from ${URL}\n`)
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
 * Retrieve each session in a season for a specific league.
 *
 * Example usage:
 * ```typescript
 * getLeagueSeasonSessions({ league_id: 12345, season_id: 12345 }) // Returns the sessions for the league with the ID of 12345
 * ```
 *
 * Required Params:
 * @param {number} league_id - The ID of the league you want to retrieve the sessions for.
 * @param {number} season_id - The ID of the season you want to retrieve the sessions for.
 *
 * Optional Params:
 * @param {boolean} results_only - If true, include only sessions for which results are available.
 */
export const getLeagueSeasonSessions = async ({
  league_id,
  season_id,
  results_only,
}: {
  league_id: number
  season_id: number
  results_only?: boolean
}): Promise<LeagueSessionData | undefined> => {
  if (!league_id || !season_id)
    throw new Error("Cannot complete request. Missing required parameters. (league_id, season_id)")
  const URL = appendParams(
    `https://members-ng.iracing.com/data/league/season_sessions?league_id=${league_id}&season_id=${season_id}`,
    {
      results_only,
    }
  )
  console.log(`Attempting to retrieve league season session from ${URL}\n`)
  try {
    const { link } = await client.get(URL).then((response) => response.data)
    const data = await client.get(link).then((response) => response.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}
