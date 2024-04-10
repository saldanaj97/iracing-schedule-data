import { CarInfo, RacingSeason, Series, Track } from "../src/types"

import listOfAllCars from "./mock-data/carList.json"
import detailedSeriesData from "./mock-data/detailedSeriesData.json"
import generalizedSeriesData from "./mock-data/generalizedSeriesData.json"
import successfulAuth from "./mock-data/successfulAuth.json"
import trackList from "./mock-data/trackList.json"

export const fetchAuthCookieMock = jest.fn(async ({ username, password }: { username: string; password: string }) => {
  if (username !== "" && password !== "") {
    return successfulAuth
  } else {
    throw new Error("Invalid username or password")
  }
})

export const getAllSeriesMock = jest.fn(async ({ link }: { link: string }): Promise<Series[] | undefined> => {
  try {
    // TODO: look at this error handling for the link again
    if (!link) {
      throw new Error(`Failed to receive link required for gathering all of the series.`)
    }
    if (!generalizedSeriesData) {
      throw new Error("Failed to get series data for the season.")
    }
    return generalizedSeriesData
  } catch (error) {
    console.error(
      `'getGeneralizedSeriesData' request failed. An error occurred while fetching available series: ${error}`
    )
    return undefined
  }
})

export const getAllSeriesSchedulesMock = jest.fn(
  async ({ link }: { link: string }): Promise<RacingSeason[] | undefined> => {
    try {
      if (!link) {
        throw new Error(`Failed to receive link required for gathering the series schedules.`)
      }
      if (!detailedSeriesData) {
        throw new Error("Failed to get series schedules for the season.")
      }
      const parsedDetailData = JSON.parse(JSON.stringify(detailedSeriesData))
      const slicedDetailData = parsedDetailData.slice(0, 5)
      return slicedDetailData
    } catch (error) {
      console.error(
        `'getAllSeriesSchedules' request failed. An error occurred while fetching series schedules: ${error}`
      )
      return undefined
    }
  }
)

export const getAllCarsMock = jest.fn(async ({ link }: { link: string }): Promise<CarInfo[] | undefined> => {
  try {
    if (!link) {
      throw new Error(`Failed to receive link required for gathering the car data.`)
    }
    if (!listOfAllCars) {
      throw new Error("Failed to get car list.")
    }
    return listOfAllCars as CarInfo[]
  } catch (error) {
    console.error(`'getListOfAllCars' request failed. An error occurred while fetching car list: ${error}`)
    return undefined
  }
})

export const getAllTracksMock = jest.fn(async ({ link }: { link: string }): Promise<Track[] | undefined> => {
  try {
    if (!link) {
      throw new Error(`Failed to receive track link required for gathering the rest of the data.`)
    }
    if (!trackList) {
      throw new Error("Failed to get track list.")
    }
    return trackList as Track[]
  } catch (error) {
    console.error(`'getTrackData' request failed. An error occurred while fetching track data: ${error}`)
    return undefined
  }
})
