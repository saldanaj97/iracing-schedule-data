import { client } from "../utils/axiosSetup"
import { Track, TrackAssets } from "./types"

/**
 * Function to retrieve all tracks available on iRacing.
 *
 * Example Usage:
 *
 * ```typescript
 * getTrackData() // Returns an array of all tracks available on iRacing
 * ```
 */
export const getTrackData = async (): Promise<Track[] | undefined> => {
  const trackData: Track[] = []
  try {
    const URL = "https://members-ng.iracing.com/data/track/get"
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return trackData
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Function to retrieve track assets.
 *
 * Example Usage:
 *
 * ```typescript
 * getTrackAssets() // Returns all assets for the tracks available on iRacing
 * ```
 */
export const getTrackAssets = async (): Promise<TrackAssets[] | undefined> => {
  const URL = "https://members-ng.iracing.com/data/track/assets"
  try {
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}
