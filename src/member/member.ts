import { client } from "./utils/axiosSetup"

/**
 * Return a list of awards for a specific member. If no cust_id is provided, the function will return the awards for the authenticated user.
 *
 * Example Usage:
 * ```typescript
 * getMemberAwards({ cust_id: 12345 })
 * ```
 *
 * @param cust_id: The member ID of the user to retrieve awards for.
 */
export const getMemberAwards = async ({ cust_id }: { cust_id?: number }) => {
  let URL = "https://members-ng.iracing.com/data/member/awards"
  try {
    if (cust_id) URL += `?cust_id=${cust_id}`
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Retrieve the chart data for a member. If no cust_is is provided, the function will return the chart data for the authenticated user.
 *
 * Example Usage:
 * ```typescript
 * getMemberChartData({ cust_id: 12345, category_id: 1, chart_type: '1' })
 * ```
 *
 * Required Params:
 * @param cust_id: The member ID of the user to retrieve chart data for.
 * @param category_id: The category ID of the chart data to retrieve. (1 - Oval; 2 - Road; 3 - Dirt oval; 4 - Dirt road)
 * @param chart_type: The type of chart data to retrieve. (1 - iRating; 2 - TT Rating; 3 - License/SR)
 *
 */
export const getMemberChartData = async ({
  cust_id,
  category_id,
  chart_type,
}: {
  cust_id?: number
  category_id: number
  chart_type: number
}) => {
  let URL = "https://members-ng.iracing.com/data/member/chart_data"
  try {
    if (cust_id) URL += `?cust_id=${cust_id}`
    if (category_id === undefined) throw new Error("Cannot complete request: category_id is required.")
    if (chart_type === undefined) throw new Error("Cannot complete request: chart_type is required.")
    URL += `&category_id=${category_id}&chart_type=${chart_type}`
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Retrieve the club data for a member. If no cust_id is provided, the function will return the club data for the authenticated user.
 *
 * Example Usage:
 * ```typescript
 * getMemberData({ cust_ids: "693109, 82554" }) // Returns club data for the specified members
 * ```
 *
 * Required Params:
 * @param cust_ids: The member ID of the user to retrieve club data for. (ie. "123456, 12345" for multiple ids, or "123456" for a single id)
 */
export const getMemberData = async ({
  cust_ids,
  included_licenses,
}: {
  cust_ids: string
  included_licenses?: boolean
}) => {
  let URL = `https://members-ng.iracing.com/data/member/get?cust_ids=${cust_ids}`
  try {
    if (!cust_ids) throw new Error("Cannot complete request: at least one cust_id is required.")
    if (included_licenses) URL += `&included_licenses=1`
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Retrieve personal info.
 *
 * Example Usage:
 * ```typescript
 * getPersonalInfo()
 * ```
 */
export const getPersonalInfo = async () => {
  const URL = "https://members-ng.iracing.com/data/member/info"
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
 * Retrieve personal participation credit data. Participation credits are rewarded for participating in certain licensed series and are awarded at the end
 * of each season.
 * Example Usage:
 * ```typescript
 * getPersonalParticipationCredits()
 * ```
 */
export const getPersonalParticipationCredits = async () => {
  const URL = "https://members-ng.iracing.com/data/member/participation_credits"
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
 * Retrieve the specific member's profile. If no cust_id is provided, defaults to the authenticated user.
 *
 * Example Usage:
 * ```typescript
 * getMemberProfile({cust_id: 12345}) // Returns the profile for the specified member
 * ```
 *
 * Required Params:
 * @param cust_id: The member ID of the user to retrieve profile data for. Defaults to the authenticated member.
 */
export const getMemberProfile = async ({ cust_id }: { cust_id?: number }) => {
  let URL = "https://members-ng.iracing.com/data/member/profile"
  try {
    if (cust_id) URL += `?cust_id=${cust_id}`
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}
