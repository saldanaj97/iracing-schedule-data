import generalizedSeriesData from '../__mocks__/test-data/generalizedSeriesData.json'
import successfulAuthResponse from '../__mocks__/test-data/successfulAuth.json'

// Mock the post method of Axios
export const axiosMockPost = jest.fn().mockResolvedValueOnce({
  data: successfulAuthResponse,
})

export const axiosMockGetSeries = jest
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
