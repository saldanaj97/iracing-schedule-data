import { Url } from 'url'
import { Series, SeriesList } from '../types'
import { axiosMockGetSeries, axiosMockPost } from './axiosMocks'

export const fetchAuthCookieMock = jest.fn(async ({ username, password }: { username: string; password: string }) => {
  if (username === 'sampleUsername' && password === 'samplePassword') {
    const response = await axiosMockPost('https://members-ng.iracing.com/auth', {
      username: 'sampleUsername',
      password: 'samplePassword',
    })
    return response.data
  } else {
    throw new Error('Invalid username or password')
  }
})

export const getSeriesDataMock = jest.fn(async (): Promise<SeriesList | undefined> => {
  const { link } = await axiosMockGetSeries('https://members-ng.iracing.com/data/series/get').then(
    (response: { data: Url }) => response.data
  )
  if (!link) throw new Error('\nFailed to get series link required for gathering the rest of the data. \n')
  const { all_series_available } = await axiosMockGetSeries(link).then((response: { data: Series[] }) => response.data)
  if (!all_series_available) throw new Error('\nFailed to get series data for the season. \n')
  return all_series_available
})

export const getDetailedSeriesDataMock = jest.fn()

export const getListOfAllCarsMock = jest.fn()

export const getTrackDataMock = jest.fn()

export const writeDataToFileMock = jest.fn()
