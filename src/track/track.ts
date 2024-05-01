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
  const URL = "https://members-ng.iracing.com/data/track/get"
  console.log(`Attempting to retrieve track data from ${URL}\n`)
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
  console.log(`Attempting to retrieve track assets from ${URL}\n`)
  try {
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}
