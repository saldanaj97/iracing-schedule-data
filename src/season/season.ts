import { appendParams } from "../utils/appendParams"
import { client } from "../utils/axiosSetup"
import { RaceGuide, Series, SpectatorSubsession } from "./types"

/**
 * Retrieve the list of seasons for a specific year and quarter.
 *
 * Example Usage:
 * ```typescript
 * const seasonList = await getSeasonList({ season_year: 2024, season_quarter: 1 });
 * ```
 *
 * Required Parameters:
 * @param season_year The year of the season.
 * @param season_quarter The quarter of the season.
 *
 */
export const getSeasonList = async ({
  season_year,
  season_quarter,
}: {
  season_year: number
  season_quarter: number
}): Promise<Series | undefined> => {
  let URL = appendParams("https://members-ng.iracing.com/data/season/list?", {
    season_year,
    season_quarter,
  })
  console.log("Retrieving season list from:", URL)
  try {
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return data
  } catch (error: any) {
    console.log(error)
    return undefined
  }
}

/**
 * Retrieve the race guide for a specific date.
 *
 * Example Usage:
 * ```typescript
 * const raceGuideData = await getRaceGuide({ from: '2024-04-25', include_end_after_from: true });
 * ```
 *
 * Optional Parameters:
 * @param from The start date for the race guide in 'YYYY-MM-DD' format.
 * @param include_end_after_from Whether to include races that end after the specified start date.
 *
 */
export const getRaceGuide = async ({
  from,
  include_end_after_from,
}: {
  from?: string
  include_end_after_from?: boolean
}): Promise<RaceGuide | undefined> => {
  let URL = appendParams("https://members-ng.iracing.com/data/season/race_guide?", {
    from,
    include_end_after_from,
  })
  console.log("Retrieving race guide from season:", URL)
  try {
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return data
  } catch (error: any) {
    console.log(error)
    return undefined
  }
}

/**
 * Retrieve the spectator subsession IDs for specific event types.
 *
 * Example Usage:
 * ```typescript
 * const spectatorSubsessionIDs = await getSpectatorSubessionIDs({ event_types: [1, 2, 3] });
 * ```
 *
 * Optional Parameters:
 * @param event_types An array of event types for which to retrieve spectator subsession IDs.
 *
 */
export const getSpectatorSubessionIDs = async ({
  event_types,
}: {
  event_types?: number[]
}): Promise<SpectatorSubsession | undefined> => {
  let URL = appendParams("https://members-ng.iracing.com/data/season/spectator_subsessionids?", {
    event_types,
  })
  console.log("Retrieving spectator subsession IDs from:", URL)
  try {
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return data
  } catch (error: any) {
    console.log(error)
    return undefined
  }
}
