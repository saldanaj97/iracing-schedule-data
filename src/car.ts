import { Car } from "./types"
import { client } from "./utils/axiosSetup"

/**
 * Function that will grab EVERY car available on the service
 * @returns A list containing each cars id and the corresponding vehicle in natural language
 */
export const getListOfAllCars = async (): Promise<Car[] | undefined> => {
  try {
    const URL = "https://members-ng.iracing.com/data/carclass/get"
    const { link } = (await client.get(URL)).data

    const listOfAvailableCars: Car[] = []
    const seen: Set<string> = new Set() // Use a set to efficiently check for duplicates

    const response = (await client.get(link)).data
    for (const car of response) {
      const { car_class_id, cars_in_class, cust_id, name, rain_enabled, relative_speed, short_name } = car
      if (!seen.has(name)) {
        seen.add(name)
        listOfAvailableCars.push({
          car_class_id,
          cars_in_class,
          cust_id,
          name,
          rain_enabled,
          relative_speed,
          short_name,
        })
      }
    }
    return listOfAvailableCars
  } catch (error) {
    console.error(error)
    return undefined
  }
}
