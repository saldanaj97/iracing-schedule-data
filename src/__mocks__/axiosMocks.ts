import listOfAllCars from '../__mocks__/mock-data/carList.json'
import detailedSeriesData from '../__mocks__/mock-data/detailedSeriesData.json'
import generalizedSeriesData from '../__mocks__/mock-data/generalizedSeriesData.json'
import successfulAuthResponse from '../__mocks__/mock-data/successfulAuth.json'
import listOfAllTracks from '../__mocks__/mock-data/trackList.json'

// Mock the post method of Axios
export const apiAuthPostAxiosMock = jest.fn().mockResolvedValueOnce({
  data: successfulAuthResponse,
})

export const getGeneralizedSeriesDataAxiosMock = jest
  .fn()
  .mockResolvedValueOnce({
    data: {
      link: 'https://example.com/seriesList',
    },
  })
  .mockResolvedValueOnce({
    data: {
      all_series_available: generalizedSeriesData,
    },
  })

export const getDetailedSeriesDataAxiosMock = jest
  .fn()
  .mockResolvedValueOnce({
    data: {
      link: 'https://example.com/detailedSeriesData',
    },
  })
  .mockResolvedValueOnce({
    data: {
      detailed_series_data: detailedSeriesData,
    },
  })

export const getListOfAllCarsAxiosMock = jest
  .fn()
  .mockResolvedValueOnce({
    data: {
      link: 'https://example.com/carlist',
    },
  })
  .mockResolvedValueOnce({
    data: {
      cars: listOfAllCars,
    },
  })

export const getListOfAllTracksAxiosMock = jest
  .fn()
  .mockResolvedValueOnce({
    data: {
      link: 'https://example.com/trackList',
    },
  })
  .mockResolvedValueOnce({
    data: {
      tracks: listOfAllTracks,
    },
  })
