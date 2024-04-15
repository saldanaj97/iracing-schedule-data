import { CustomLeagueSession } from "./types"
import { client } from "./utils/axiosSetup"

/**
 * Function to retrieve hosted sessions.
 * @param {boolean} [mine] - If true, returns only sessions created by the user.
 * @param {number} [package_id] - If set, returns only sessions using this car or track package ID (per the official API docs).
 * @returns {Promise<HostedSession[] | undefined>} A list of sessions that can be joined as a driver or spectator, including non-league pending sessions for the user.
 */
export const getCustomLeagueSession = async ({
  mine,
  package_id,
}: {
  mine?: boolean
  package_id?: number
}): Promise<CustomLeagueSession | undefined> => {
  let URL = `https://members-ng.iracing.com/data/league/cust_league_sessions`
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
 * For now, please only include ONE of the OPTIONAL parameters: `search`, `tag`, `restrict_to_member`, `restrict_to_recruiting`, `restrict_to_friends`, `restrict_to_watched`, `minimum_roster_count`, `maximum_roster_count`, `lowerbound`, `upperbound`, `sort`, `order`.
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
  let URL = `https://members-ng.iracing.com/data/league/directory`

  if (search !== undefined) {
    encodeURIComponent(search)
    URL += `?search=${search}`
  }

  if (restrict_to_member !== undefined)
    restrict_to_member === true ? (URL += `?restrict_to_member=1`) : (URL += `?restrict_to_member=0`)

  if (restrict_to_recruiting !== undefined)
    restrict_to_recruiting === true ? (URL += `?restrict_to_recruiting=1`) : (URL += `?restrict_to_recruiting=0`)

  if (restrict_to_friends !== undefined)
    restrict_to_friends === true ? (URL += `?restrict_to_friends=1`) : (URL += `?restrict_to_friends=0`)

  if (restrict_to_watched !== undefined)
    restrict_to_watched === true ? (URL += `?restrict_to_watched=1`) : (URL += `?restrict_to_watched=0`)

  console.log(URL)
  try {
    const { link } = await client.get(URL).then((response) => response.data)
    const { results_page } = await client.get(link).then((response) => response.data)
    return results_page
  } catch (error) {
    console.error(error)
    return undefined
  }
}
