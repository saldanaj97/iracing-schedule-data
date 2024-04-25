import { client } from "../utils/axiosSetup"
import { Club } from "./types"

/**
 * Return the different clubs available on the service. Returns an earlier history if requirested quarter does not have a club history.
 *
 * Example usage:
 * ```typescript
 *  lookupClubHistory({ season_year: 2021, season_quarter: 1 }) // Returns club history for 2021S1
 * ```
 *
 * Required Params:
 * @param season_year: The year of the season you want to look up
 * @param season_quarter: The quarter of the season you want to look up
 */
export const lookupClubHistory = async ({
  season_year,
  season_quarter,
}: {
  season_year: number
  season_quarter: number
}): Promise<Club | undefined> => {
  let URL = `https://members-ng.iracing.com/data/lookup/club_history?season_year=${season_year}&season_quarter=${season_quarter}`
  if (season_year || !season_quarter) throw new Error("Please provide both a season year and quarter.")
  try {
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return data
  } catch (error) {
    console.log(error)
    return undefined
  }
}

/**
 * Return the countries and their codes available on the service.
 *
 * Example usage:
 * ```typescript
 * lookupCountries() // Returns all countries and their codes
 * ```
 */
export const lookupCountries = async () => {
  const URL = "https://members-ng.iracing.com/data/lookup/countries"
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
 * Return the driver on the service with the given customer_id (search_term).
 *
 * Example usage:
 * ```typescript
 * lookupDrivers({search_term: 123456}) // Returns
 * ```
 *
 * Required Params:
 * @param cust_id - The customer_id of the driver you want to look up.
 *
 * Optional Params:
 * @param league_id - ID of the league you want to search in. Narrows the search to the roster of the given league.
 */
export const lookupDrivers = async ({ cust_id, league_id }: { cust_id: string; league_id?: number }) => {
  let URL = `https://members-ng.iracing.com/data/lookup/drivers?search_term=${cust_id}`
  if (league_id) URL += `&league_id=${league_id}`
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
 * Return the different licenses available on the service.
 *
 * Example usage:
 * ```typescript
 * lookupLicenses() // Returns all licenses
 * ```
 */
export const lookupLicenses = async () => {
  const URL = "https://members-ng.iracing.com/data/lookup/licenses"
  try {
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}
