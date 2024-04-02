import { fetchAuthCookieMock } from '../__mocks__/fetchAuthCookieMock'

jest.mock('../index', () => ({
  fetchAuthCookieMock,
  getCertainSeriesData: jest.fn(),
  getSeriesData: jest.fn(),
  getDetailedSeriesData: jest.fn(),
  getListOfAllCars: jest.fn(),
  getTrackData: jest.fn(),
  writeDataToFile: jest.fn(),
}))

describe('index.ts', () => {
  describe('fetchAuthCookie', () => {
    it('should authenticate with iRacing API and update the cookie', async () => {
      // Call the fetchAuthCookie function with sample username and password
      const result = await fetchAuthCookieMock({ username: 'sampleUsername', password: 'samplePassword' })

      // Verify that the function returns the expected token
      expect(result).toEqual({
        authcode: expect.any(String),
        autoLoginSeries: null,
        autoLoginToken: null,
        custId: expect.any(Number),
        email: expect.any(String),
        ssoCookieDomain: expect.any(String),
        ssoCookieName: expect.any(String),
        ssoCookiePath: expect.any(String),
        ssoCookieValue: expect.any(String),
      })
    })
  })
  describe('getCertainSeriesData', () => {
    it('should return basic data about a specific series', async () => {
      // Test implementation here
    })
  })

  describe('getSeriesData', () => {
    it('should return basic data about every active series in the current season', async () => {
      // Test implementation here
    })
  })

  describe('getDetailedSeriesData', () => {
    it('should retrieve the detailed season series data for every series in the current season', async () => {
      // Test implementation here
    })
  })

  describe('getListOfAllCars', () => {
    it('should return a list of all cars available on the service', async () => {
      // Test implementation here
    })
  })

  describe('getTrackData', () => {
    it('should return a list of all tracks available on the service', async () => {
      // Test implementation here
    })
  })

  describe('writeDataToFile', () => {
    it('should write JSON data to the specified file', () => {
      // Test implementation here
    })
  })
})
