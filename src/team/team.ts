import { client } from "../auth/axiosSetup"
import { TeamInfo } from "./types"

/**
 * Function to retrieve a team's profile.
 *
 * Example Usage:
 *
 * ```typescript
 * getTeamProfile({team_id: 12345})
 * ```
 *
 * Required Params:
 * @param team_id - The team ID of the team to retrieve profile data for.
 *
 * Optional Params:
 * @param include_licenses - Whether or not to include license data in the response. For faster responses, only request license data when needed.
 */
export const getTeamProfile = async ({
  team_id,
  include_licenses,
}: {
  team_id: number
  include_licenses?: boolean
}): Promise<TeamInfo | undefined> => {
  if (!team_id) throw new Error("Cannot complete request: Missing required parameters (team_id)")
  let URL = `https://members-ng.iracing.com/data/team/get?team_id=${team_id}`
  console.log(`Attempting to retrieve team profile data from ${URL}\n`)
  try {
    if (include_licenses) URL += "&include_licenses=1"
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}
