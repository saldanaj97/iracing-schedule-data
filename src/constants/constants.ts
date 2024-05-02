import { client } from "../auth/axiosSetup"
import { ConstantType } from "./types"

/**
 * Function that will grab all the constants available on the API
 *
 * Example Usage:
 * ```typescript
 * const constants = await getConstants({ constant: "categories" })
 * ```
 *
 * @param constant - The constant you want to retrieve (categories, car_classes, event_types)
 * @returns A list containing each constant and its corresponding value
 */
export const getConstants = async ({
  constant,
}: {
  constant: "categories" | "car_classes" | "event_types"
}): Promise<ConstantType[] | undefined> => {
  const URL = `https://members-ng.iracing.com/data/constants/${constant}`
  console.log(`Attempting to constants from ${URL}\n`)

  try {
    const constants = await client.get(URL).then((response) => response.data)
    return constants
  } catch (error) {
    console.error(error)
    return undefined
  }
}
