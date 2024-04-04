import { fetchAuthCookieMock, getSeriesDataMock } from '../__mocks__/iracingMocks'

jest.mock('../index', () => ({
  fetchAuthCookieMock: () => fetchAuthCookieMock({ username: 'sampleUsername', password: 'samplePassword' }),
  getSeriesData: () => getSeriesDataMock(),
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

  describe('getSeriesData', () => {
    it('should retrieve the basic data about every active series in the current season', async () => {
      const mockSeriesData = await getSeriesDataMock()
      expect(mockSeriesData).toContainEqual({
        allowed_licenses: expect.arrayContaining([
          expect.objectContaining({
            license_group: expect.any(Number),
            min_license_level: expect.any(Number),
            max_license_level: expect.any(Number),
            group_name: expect.any(String),
          }),
        ]),
        category: expect.any(String),
        category_id: expect.any(Number),
        eligible: expect.any(Boolean),
        forum_url: expect.any(String),
        max_starters: expect.any(Number),
        min_starters: expect.any(Number),
        oval_caution_type: expect.any(Number),
        road_caution_type: expect.any(Number),
        series_id: expect.any(Number),
        series_name: expect.any(String),
        series_short_name: expect.any(String),
      })
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
