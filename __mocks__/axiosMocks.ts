import listOfAllCars from "./mock-data/carList.json"
import detailedSeriesData from "./mock-data/detailedSeriesData.json"
import generalizedSeriesData from "./mock-data/generalizedSeriesData.json"
import successfulAuthResponse from "./mock-data/successfulAuth.json"
import listOfAllTracks from "./mock-data/trackList.json"

/**
 * Mocks the post method of Axios for authentication.
 * Resolves with a successful authentication response.
 */
export const apiAuthPostAxiosMock = jest.fn().mockResolvedValueOnce({
  data: successfulAuthResponse,
})

/**
 * Mocks the Axios request for fetching generalized series data.
 * Resolves with a link to the series list and the generalized series data.
 */
export const getGeneralizedSeriesDataAxiosMock = jest
  .fn()
  .mockResolvedValueOnce({
    data: {
      link: "https://example.com/seriesList",
    },
  })
  .mockResolvedValueOnce({
    data: {
      all_series_available: generalizedSeriesData,
    },
  })

/**
 * Mocks the Axios request for fetching detailed series data.
 * Resolves with a link to the detailed series data and the detailed series data itself.
 */
export const getDetailedSeriesDataAxiosMock = jest
  .fn()
  .mockResolvedValueOnce({
    data: {
      link: "https://example.com/detailedSeriesData",
    },
  })
  .mockResolvedValueOnce({
    data: {
      detailed_series_data: detailedSeriesData,
    },
  })

/**
 * Mocks the Axios request for fetching the list of all cars.
 * Resolves with a link to the car list and the list of all cars.
 */
export const getListOfAllCarsAxiosMock = jest
  .fn()
  .mockResolvedValueOnce({
    data: {
      link: "https://example.com/carlist",
    },
  })
  .mockResolvedValueOnce({
    data: {
      cars: listOfAllCars,
    },
  })

/**
 * Mocks the Axios request for fetching the list of all tracks.
 * Resolves with a link to the track list and the list of all tracks.
 */
export const getListOfAllTracksAxiosMock = jest
  .fn()
  .mockResolvedValueOnce({
    data: {
      link: "https://example.com/trackList",
    },
  })
  .mockResolvedValueOnce({
    data: {
      tracks: listOfAllTracks,
    },
  })
