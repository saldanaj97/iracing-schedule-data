import { Url } from 'url'
import { Car, Series, SeriesScheduleData } from '../types'
import { apiAuthPostMock, getGeneralizedSeriesDataMock } from './axiosMocks'

export const fetchAuthCookieMock = jest.fn(async ({ username, password }: { username: string; password: string }) => {
  if (username === 'sampleUsername' && password === 'samplePassword') {
    const response = await apiAuthPostMock('https://members-ng.iracing.com/auth', {
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
    const { link } = await getGeneralizedSeriesDataMock('https://members-ng.iracing.com/data/series/get').then(
      (response: { data: Url }) => response.data
    )

    if (!link) {
      throw new Error(`Failed to get series link required for gathering the rest of the data.`)
    }

    const { all_series_available } = await getGeneralizedSeriesDataMock(link).then(
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

export const getAllSeriesSchedulesMock = jest.fn(async (): Promise<SeriesScheduleData | undefined> => {
  try {
    const { link } = await getGeneralizedSeriesDataMock(
      'https://members-ng.iracing.com/data/series/seasons?include_series=1'
    ).then((response: { data: Url }) => response.data)

    if (!link) {
      throw new Error(`Failed to get series link required for gathering the rest of the data.`)
    }

    const { detailed_series_data } = await getGeneralizedSeriesDataMock(link).then(
      (response: { data: SeriesScheduleData[] }) => response.data
    )

    if (!detailed_series_data) {
      throw new Error('Failed to get series schedules for the season.')
    }

    return detailed_series_data
  } catch (error) {
    console.error(`'getAllSeriesSchedules' request failed. An error occurred while fetching series schedules: ${error}`)
    return undefined
  }
})

export const getListOfAllCarsMock = jest.fn(async (): Promise<Car[] | undefined> => {
  try {
    const { link } = await getGeneralizedSeriesDataMock('https://members.iracing.com/membersite/member/Cars.do').then(
      (response: { data: Url }) => response.data
    )

    if (!link) {
      throw new Error(`Failed to get car link required for gathering the rest of the data.`)
    }

    const { cars } = await getGeneralizedSeriesDataMock(link).then((response: { data: Car[] }) => response.data)

    if (!cars) {
      throw new Error('Failed to get car list.')
    }

    return cars
  } catch (error) {
    console.error(`'getListOfAllCars' request failed. An error occurred while fetching car list: ${error}`)
    return undefined
  }
})

export const getTrackDataMock = jest.fn()

export const writeDataToFileMock = jest.fn()
