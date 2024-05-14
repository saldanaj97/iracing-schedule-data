import { StatusCodes } from "http-status-codes"
import IRacingSDK from "../src/sdk/iracing-sdk"
import { nockHelper } from "./helpers"

const mockResponsePath = __dirname + "/responses/"

describe("Stats Functions", () => {
  const client: IRacingSDK = new IRacingSDK("email", "password")
  let getResource: jest.SpyInstance

  const mockResourceGet = async (filePath: string) => {
    getResource.mockResolvedValue(await import(filePath))
  }

  beforeAll(() => {
    nockHelper()
      .post("/auth")
      .replyWithFile(StatusCodes.OK, mockResponsePath + "auth.json")
  })

  beforeEach(() => {
    getResource = jest.spyOn(client, "request")
    nockHelper()
      .get(/[^/]+$/)
      .replyWithFile(StatusCodes.OK, mockResponsePath + "signed-url.json")
  })

  it("should retrieve member bests", async () => {
    const mockFile = mockResponsePath + "stats/member-bests.json"
    nockHelper().get("/data/stats/member_bests").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const memberBests = await client.getMemberBests({})
    expect(memberBests.cust_id).toEqual(693109)
    expect(memberBests.car_id).toEqual(159)
  })

  it("should retrieve member career stats", async () => {
    const mockFile = mockResponsePath + "stats/member-career-stats.json"
    nockHelper().get("/data/stats/member_career_stats").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const memberStats = await client.getMemberCareerStats({})
    expect(memberStats.cust_id).toEqual(693109)
  })

  it("should retrieve member divison stats", async () => {
    const mockFile = mockResponsePath + "stats/member-division-stats.json"
    nockHelper().get("/data/stats/member_division_stats").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const memberDivisonStats = await client.getMemberDivisionStats({
      season_id: 1,
      event_type: 1,
    })
    expect(memberDivisonStats.success).toEqual(true)
    expect(memberDivisonStats.division).toEqual(3)
  })

  it("should retrieve member recap", async () => {
    const mockFile = mockResponsePath + "stats/member-recap.json"
    nockHelper().get("/data/stats/member_recap").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const memberRecap = await client.getMemberRecap({})
    expect(memberRecap.year).toEqual(2024)
    expect(memberRecap.success).toEqual(true)
  })

  it("should retrieve recent races", async () => {
    const mockFile = mockResponsePath + "stats/recent-races.json"
    nockHelper().get("/data/stats/recent-races").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const recentRaces = await client.getRecentRaces({})
    expect(recentRaces.races[0].season_id).toEqual(4753)
    expect(recentRaces.cust_id).toEqual(693109)
  })

  it("should retrieve member summary", async () => {
    const mockFile = mockResponsePath + "stats/member-summary.json"
    nockHelper().get("/data/stats/member-summary").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const memberSummary = await client.getMemberSummary({})
    expect(memberSummary.cust_id).toEqual(693109)
    expect(memberSummary.this_year.num_official_sessions).toEqual(50)
  })

  it("should retrieve member yearly summary", async () => {
    const mockFile = mockResponsePath + "stats/member-yearly.json"
    nockHelper().get("/data/stats/member_yearly").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const memberYearlySummary = await client.getYearlyStats({})
    expect(memberYearlySummary.cust_id).toEqual(693109)
  })

  it("should retrieve season driver standings", async () => {
    const mockFile = mockResponsePath + "stats/season-driver-standings.json"
    nockHelper().get("/data/stats/season-driver-standings").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const seasonStandings = await client.getSeasonDriverStandings({
      season_id: 1,
      car_class_id: 1,
    })
    expect(seasonStandings.success).toEqual(true)
    expect(seasonStandings.season_id).toEqual(4753)
  })

  it("should retrieve season qualifying standings", async () => {
    const mockFile = mockResponsePath + "stats/season-qualifying-results.json"
    nockHelper().get("/data/stats/season_qualifying_results").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const qualifyingResults = await client.getSeasonQualifyingResults({
      season_id: 1,
      car_class_id: 1,
      race_week_num: 1,
    })
    expect(qualifyingResults.success).toEqual(true)
    expect(qualifyingResults.season_id).toEqual(4753)
  })

  it("should retrieve season supersession standings", async () => {
    const mockFile = mockResponsePath + "stats/season-supersession-standings.json"
    nockHelper().get("/data/stats/season-driver-standings").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const supersessionStandings = await client.getSeasonSupersessionStandings({
      season_id: 1,
      car_class_id: 1,
      race_week_num: 1,
    })
    expect(supersessionStandings.success).toEqual(true)
    expect(supersessionStandings.season_id).toEqual(4753)
  })
})

describe("Stats Function Error Testing", () => {
  const client: IRacingSDK = new IRacingSDK("email", "password")

  beforeAll(() => {
    nockHelper()
      .post("/auth")
      .replyWithFile(StatusCodes.OK, mockResponsePath + "auth.json")
    jest.spyOn(console, "log").mockImplementation(() => {})
    jest.spyOn(client, "request").mockRejectedValue(new Error("Mocked error"))
  })

  beforeEach(() => {
    nockHelper()
      .get(/[^/]+$/)
      .replyWithFile(StatusCodes.OK, mockResponsePath + "signed-url.json")
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it("should throw an error when getting member bests", async () => {
    await expect(client.getMemberBests({})).rejects.toThrow("Mocked error")
  })

  it("should throw an error when getting member career stats", async () => {
    await expect(client.getMemberCareerStats({})).rejects.toThrow("Mocked error")
  })

  it("should throw an error when getting member divison stats", async () => {
    await expect(client.getMemberDivisionStats({ season_id: 1, event_type: 1 })).rejects.toThrow("Mocked error")
  })

  it("should throw an error when season_id and event_type are missing from getMemberDivisionStats", async () => {
    await expect(client.getMemberDivisionStats({} as any)).rejects.toThrow(
      "Cannot complete request. Missing required parameters. (season_id, event_type)"
    )
  })

  it("should throw an error when getting member recap", async () => {
    await expect(client.getMemberRecap({})).rejects.toThrow("Mocked error")
  })

  it("should throw an error when getting members recent races", async () => {
    await expect(client.getRecentRaces({})).rejects.toThrow("Mocked error")
  })

  it("should throw an error when getting member summary", async () => {
    await expect(client.getMemberSummary({})).rejects.toThrow("Mocked error")
  })

  it("should throw an error when getting member yearly summary", async () => {
    await expect(client.getYearlyStats({})).rejects.toThrow("Mocked error")
  })

  it("should throw an error when getting season driver standings", async () => {
    await expect(client.getSeasonDriverStandings({ season_id: 1, car_class_id: 1 })).rejects.toThrow("Mocked error")
  })

  it("should throw an error when season_id and car_class_id are missing from getSeasonDriverStandings", async () => {
    await expect(client.getSeasonDriverStandings({} as any)).rejects.toThrow(
      "Cannot complete request. Missing required parameters. (season_id, car_class_id)"
    )
  })

  it("should throw an error when getting season qualifying standings", async () => {
    await expect(
      client.getSeasonQualifyingResults({ season_id: 1, car_class_id: 1, race_week_num: 1 })
    ).rejects.toThrow("Mocked error")
  })

  it("should throw an error when season_id, car_class_id, and race_week_num are missing from getSeasonQualifyingResults", async () => {
    await expect(client.getSeasonQualifyingResults({} as any)).rejects.toThrow(
      "Cannot complete request. Missing required parameters. (season_id, car_class_id, race_week_num)"
    )
  })

  it("should throw an error when getting season supersession standings", async () => {
    await expect(
      client.getSeasonSupersessionStandings({ season_id: 1, car_class_id: 1, race_week_num: 1 })
    ).rejects.toThrow("Mocked error")
  })

  it("should throw an error when season_id, car_class_id, and race_week_num are missing from getSeasonSupersessionStandings", async () => {
    await expect(client.getSeasonSupersessionStandings({} as any)).rejects.toThrow(
      "Cannot complete request. Missing required parameters. (season_id, car_class_id, race_week_num)"
    )
  })
})
