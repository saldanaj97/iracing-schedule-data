import { client } from "../utils/axiosSetup"
import { CarDetails, CarInfo } from "./types"

/**
 * Function that will grab the assets of the cars on the service.
 *
 * Example Usage:
 * ```typescript
 * const carAssets = await getCarAssets()
 * ```
 *
 * NOTE: Image paths are relative to https://images-static.iracing.com/ so you will need to append the links for the data you want to the URL
 */
export const getCarAssets = async (): Promise<CarDetails | undefined> => {
  try {
    const URL = `https://members-ng.iracing.com/data/car/assets`
    const { link } = await client.get(URL).then((res) => res.data)
    const data = await client.get(link).then((res) => res.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Function that will fetch each car available on the service
 *
 *  * Example Usage:
 * ```typescript
 * const carList = await getAllCars()
 * ```
 */
export const getAllCars = async (): Promise<CarInfo[] | undefined> => {
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
