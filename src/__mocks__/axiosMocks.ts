import listOfAllCars from '../__mocks__/test-data/carList.json'
import detailedSeriesData from '../__mocks__/test-data/detailedSeriesData.json'
import generalizedSeriesData from '../__mocks__/test-data/generalizedSeriesData.json'
import successfulAuthResponse from '../__mocks__/test-data/successfulAuth.json'

// Mock the post method of Axios
export const apiAuthPostMock = jest.fn().mockResolvedValueOnce({
  data: successfulAuthResponse,
})

export const getGeneralizedSeriesDataMock = jest
  .fn()
  .mockResolvedValueOnce({
    data: {
      link: 'https://example.com/seriesData',
    },
  })
  .mockResolvedValueOnce({
    data: {
      all_series_available: generalizedSeriesData,
    },
  })

export const getDetailedSeriesDataMock = jest
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

export const getListOfAllCarsMock = jest
  .fn()
  .mockResolvedValueOnce({
    data: {
      link: 'https://example.com/detailedSeriesData',
    },
  })
  .mockResolvedValueOnce({
    data: {
      cars: listOfAllCars,
    },
  })
