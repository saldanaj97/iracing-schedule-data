import { client } from "../auth/axiosSetup"
import { CarClass } from "./types"

/**
 * Function that will grab car class data.
 *
 * Example Usage:
 * ```typescript
 * const carClassData = await getCarClassData()
 * ```
 *
 */
export const getCarClassData = async (): Promise<CarClass[] | undefined> => {
  console.log(`Attempting to retrieve car class data from ${URL}\n`)
  try {
    const URL = "https://members-ng.iracing.com/data/carclass/get"
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}
