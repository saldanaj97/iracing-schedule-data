import { client } from "../utils/axiosSetup"

/**
 * Function to retrieve an authenticated members time attack results.
 *
 * Example Usage:
 *
 * ```typescript
 * getUserTimeAttackData({ta_comp_season_id: 12345})
 * ```
 *
 * Required Params:
 * @param ta_comp_season_id - The time attack competition season ID to retrieve data for. Defaults to the authenticated member but a season_id is still needed.
 */
export const getUserTimeAttackData = async ({ ta_comp_season_id }: { ta_comp_season_id: number }) => {
  const URL = `https://members-ng.iracing.com/data/time_attack/member_season_results?ta_comp_season_id=${ta_comp_season_id}`
  try {
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}
