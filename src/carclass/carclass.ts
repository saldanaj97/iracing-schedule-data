import { client } from "../utils/axiosSetup"
import { CarClass } from "./types"

export const getCarClasses = async (): Promise<CarClass[] | undefined> => {
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
