import { StatusCodes } from "http-status-codes"
import IRacingSDK from "../src/sdk/iracing-sdk"
import { nockHelper } from "./helpers"

const mockResponsePath = __dirname + "/responses/"

describe("Lookup Functions", () => {
  let client: IRacingSDK = new IRacingSDK("email", "password")
  let getResource: jest.SpyInstance

  const mockResouceGet = async (filePath: string) => {
    getResource.mockResolvedValue(require(filePath))
  }

  beforeAll(() => {
    nockHelper()
      .post("/auth")
      .replyWithFile(StatusCodes.OK, mockResponsePath + "auth.json")
  })

  beforeEach(() => {
    getResource = jest.spyOn(client, "request")
    nockHelper()
      .get(/[^\/]+$/)
      .replyWithFile(StatusCodes.OK, mockResponsePath + "signed-url.json")
  })

  it("should retrieve club history", async () => {
    const mockFile = mockResponsePath + "lookup/club-history.json"
    nockHelper().get("/data/lookup/club_history").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const clubHistory = await client.lookupClubHistory({ season_year: 2024, season_quarter: 2 })
    expect(clubHistory[0].club_id).toBe(50)
    expect(clubHistory[0].club_name).toBe("Africa/South Africa")
  })

  it("should retrieve country codes", async () => {
    const mockFile = mockResponsePath + "lookup/countries.json"
    nockHelper().get("/data/lookup/countries").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const countries = await client.lookupCountries()
    expect(countries[0].country_code).toBe("AF")
    expect(countries[0].country_name).toBe("Afghanistan")
  })

  it("should retrieve driver list matching name or id", async () => {
    const mockFile = mockResponsePath + "lookup/driver-lookup.json"
    nockHelper().get("/data/lookup/drivers").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const driver = await client.lookupDrivers({ cust_id: "Test Driver" })
    expect(driver[0].cust_id).toBe(123456)
    expect(driver[0].display_name).toBe("Test Driver")
  })
})
