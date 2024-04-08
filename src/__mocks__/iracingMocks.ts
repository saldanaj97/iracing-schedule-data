import { Url } from 'url'
import { Car, CarInfo, RacingSeason, Series, Track } from '../types'
import {
  apiAuthPostAxiosMock,
  getDetailedSeriesDataAxiosMock,
  getGeneralizedSeriesDataAxiosMock,
  getListOfAllCarsAxiosMock,
  getListOfAllTracksAxiosMock,
} from './axiosMocks'

export const fetchAuthCookieMock = jest.fn(async ({ username, password }: { username: string; password: string }) => {
  if (username === 'sampleUsername' && password === 'samplePassword') {
    const response = await apiAuthPostAxiosMock('https://members-ng.iracing.com/auth', {
      username: 'sampleUsername',
      password: 'samplePassword',
    })
    return response.data
  } else {
    throw new Error('Invalid username or password')
  }
})

export const getAllSeriesMock = jest.fn(async (): Promise<Series[] | undefined> => {
  try {
    const { link } = await getGeneralizedSeriesDataAxiosMock('https://members-ng.iracing.com/data/series/get').then(
      (response: { data: Url }) => response.data
    )

    if (!link) {
      throw new Error(`Failed to get series link required for gathering the rest of the data.`)
    }

    const { all_series_available } = await getGeneralizedSeriesDataAxiosMock(link).then(
      (response: { data: Series[] }) => response.data
    )

    if (!all_series_available) {
      throw new Error('Failed to get series data for the season.')
    }

    return all_series_available
  } catch (error) {
    console.error(
      `'getGeneralizedSeriesData' request failed. An error occurred while fetching available series: ${error}`
    )
    return undefined
  }
})

export const getAllSeriesSchedulesMock = jest.fn(async (): Promise<RacingSeason[] | undefined> => {
  try {
    const { link } = await getDetailedSeriesDataAxiosMock(
      'https://members-ng.iracing.com/data/series/seasons?include_series=1'
    ).then((response: { data: Url }) => response.data)

    if (!link) {
      throw new Error(`Failed to get series link required for gathering the rest of the data.`)
    }

    const { detailed_series_data } = await getDetailedSeriesDataAxiosMock(link).then(
      (response: { data: RacingSeason[] }) => response.data
    )

    if (!detailed_series_data) {
      throw new Error('Failed to get series schedules for the season.')
    }

    // Return only the first three entries of the response array since we have alot of entries
    return detailed_series_data.slice(0, 5)
  } catch (error) {
    console.error(`'getAllSeriesSchedules' request failed. An error occurred while fetching series schedules: ${error}`)
    return undefined
  }
})

export const getAllCarsMock = jest.fn(async (): Promise<CarInfo[] | undefined> => {
  try {
    const { link } = await getListOfAllCarsAxiosMock('https://members.iracing.com/membersite/member/Cars.do').then(
      (response: { data: Url }) => response.data
    )

    if (!link) {
      throw new Error(`Failed to get car link required for gathering the rest of the data.`)
    }

    const { cars } = await getListOfAllCarsAxiosMock(link).then((response: { data: Car[] }) => response.data)

    if (!cars) {
      throw new Error('Failed to get car list.')
    }
    return cars
  } catch (error) {
    console.error(`'getListOfAllCars' request failed. An error occurred while fetching car list: ${error}`)
    return undefined
  }
})

export const getAllTracksMock = jest.fn(async (): Promise<Track[] | undefined> => {
  try {
    const { link } = await getListOfAllTracksAxiosMock('https://members.iracing.com/membersite/member/Tracks.do').then(
      (response: { data: Url }) => response.data
    )

    if (!link) {
      throw new Error(`Failed to get track link required for gathering the rest of the data.`)
    }

    const { tracks } = await getListOfAllTracksAxiosMock(link).then((response: { data: Track[] }) => response.data)
    if (!tracks) {
      throw new Error('Failed to get track list.')
    }
    return tracks
  } catch (error) {
    console.error(`'getTrackData' request failed. An error occurred while fetching track data: ${error}`)
    return undefined
  }
})

export const writeDataToFileMock = jest.fn()
