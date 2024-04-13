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
