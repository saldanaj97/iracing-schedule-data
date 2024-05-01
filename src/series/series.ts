import { client } from "../utils/axiosSetup"
import { PastSeries, RacingSeason, Series, SeriesAssets, SeriesStats } from "./types"

/**
 * Return all the assets tied to the series.
 *
 * Image paths are relative to https://images-static.iracing.com/
 *
 * Example Usage:
 * ```typescript
 * const seriesAssets = await getAllSeriesAsssets()
 * ```
 */
export const getAllSeriesAsssets = async (): Promise<SeriesAssets | undefined> => {
  const URL = "https://members-ng.iracing.com/data/series/assets"
  console.log(`Attempting to retrieve series assets from ${URL}\n`)
  try {
    const { link } = await client.get(URL).then((response) => response.data)
    const data = await client.get(link).then((response) => response.data)
    return data
  } catch (error: any) {
    console.log(error.response.data)
    return undefined
  }
}

/**
 * Retrieve the general series data for all series in a season.
 *
 * This includes basic data such as (not exhaustive):
 * - Category
 * - Series ID
 * - Series Name
 * - Series Short Name
 *
 * Example Usage:
 * ```typescript
 * const series = await getAllSeries() // Return generalized series data
 * ```
 *
 */
export const getAllSeries = async (): Promise<Series[] | undefined> => {
  const URL = `https://members-ng.iracing.com/data/series/get`
  console.log(`Attempting to retrieve series data from ${URL}\n`)
  try {
    const { link } = await client.get(URL).then((response) => response.data)
    const { data } = await client.get(link).then((response) => response.data)
    return data
  } catch (error) {
    return undefined
  }
}

/**
 * Get all seasons for a series. Filter list by official:true for seasons with standings.
 *
 * Example Usage:
 * ```typescript
 * const pastSeasonData = await getPastSeasons(123) // Return past season data for series ID 123
 * ```
 *
 * Required Parameters:
 * @param series_id The series ID to get the seasons for.
 */
export const getPastSeasons = async (series_id: number): Promise<PastSeries | undefined> => {
  if (!series_id) throw new Error("Cannot complete request: Missing required parameters (series_id)")
  const URL = `https://members-ng.iracing.com/data/series/past_seasons?series_id=${series_id}`
  console.log(`Attempting to retrieve past season data from ${URL}\n`)
  try {
    const { link } = await client.get(URL).then((response) => response.data)
    const data = await client.get(link).then((response) => response.data)
    return data
  } catch (error: any) {
    console.error(error)
    return undefined
  }
}

/**
 * This function returns more detailed data about each series such as schedule, car classes, and track data.
 *
 * Example Usage:
 * ```typescript
 * const seriesData = await getCurrentSeasonsSeries() // Return detailed data for each series in the current season
 *
 */
export const getCurrentSeasonsSeries = async (): Promise<RacingSeason[] | undefined> => {
  const URL = "https://members-ng.iracing.com/data/series/seasons"
  console.log(`Attempting to retrieve current season series data from ${URL}\n`)
  try {
    const { link } = await client.get(URL).then((response) => response.data)
    const data = await client.get(link).then((response) => response.data)
    return data
  } catch (error: any) {
    console.error(error.response.data)
    return undefined
  }
}

/**
 * Get all the series offered by iRacing whether active or inactive.
 *
 * To get series and seasons for which standings should be available, filter the list by official: true.
 *
 * Example Usage:
 * ```typescript
 * const schedule = await getStatsSeries() // Return a list of series with stats
 * ```
 */
export const getStatsSeries = async (): Promise<SeriesStats | undefined> => {
  const URL = "https://members-ng.iracing.com/data/series/stats_series"
  console.log(`Attempting to retrieve stats series from ${URL}\n`)
  try {
    const { link } = await client.get(URL).then((response) => response.data)
    const data = await client.get(link).then((response) => response.data)
    return data
  } catch (error: any) {
    console.error(error.response.data)
    return undefined
  }
}
