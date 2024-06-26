import { StatusCodes } from "http-status-codes"
import IRacingSDK from "../src/sdk/iracing-sdk"
import { nockHelper } from "./helpers"

const mockResponsePath = __dirname + "/responses/"

describe("Series Functions", () => {
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

  it("should retrieve all series assets", async () => {
    const mockFile = mockResponsePath + "series/series-assets.json"
    nockHelper().get("/data/series/assets").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const assets = await client.getAllSeriesAssets()
    expect(assets["32"].series_id).toEqual(32)
  })

  it("should retrieve all series", async () => {
    const mockFile = mockResponsePath + "series/all-series.json"
    nockHelper().get("/data/series/get").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const series = await client.getAllSeries()
    expect(series[0].series_id).toEqual(514)
    expect(series[0].series_name).toEqual("GR Buttkicker Cup - Fixed")
  })

  it("should retrieve past season data for a series", async () => {
    const mockFile = mockResponsePath + "series/past-seasons.json"
    nockHelper().get("/data/series/past_seasons").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const pastSeason = await client.getPastSeasons({ series_id: 299 })
    expect(pastSeason.success).toEqual(true)
    expect(pastSeason.series_id).toEqual(299)
  })

  it("should retrieve all the current seasons series", async () => {
    const mockFile = mockResponsePath + "series/current-seasons-series.json"
    nockHelper().get("/data/series/seasons").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const currentSeason = await client.getCurrentSeasonsSeries()
    expect(currentSeason[0].season_id).toEqual(4865)
    expect(currentSeason[1].season_id).toEqual(4699)
  })

  it("should retrieve the series stats", async () => {
    const mockFile = mockResponsePath + "series/series-stats.json"
    nockHelper().get("/data/series/stats_series").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const seriesStats = await client.getSeriesStats()
    expect(seriesStats[0].series_id).toEqual(102)
    expect(seriesStats[0].category_id).toEqual(1)
  })
})

describe("Series Function Error Testing", () => {
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

  it("should throw an error when getting all series assets", async () => {
    await expect(client.getAllSeriesAssets()).rejects.toThrow("Mocked error")
  })

  it("should throw an error when getting all series", async () => {
    await expect(client.getAllSeries()).rejects.toThrow("Mocked error")
  })

  it("should throw an error when getting past season data for a series", async () => {
    await expect(client.getPastSeasons({ series_id: 299 })).rejects.toThrow("Mocked error")
  })

  it("should throw an error when a series_id is missing in getPastSeasons", async () => {
    await expect(client.getPastSeasons({} as any)).rejects.toThrow(
      "Cannot complete request. Missing required parameters. (series_id)"
    )
  })

  it("should throw an error when getting all the current seasons series", async () => {
    await expect(client.getCurrentSeasonsSeries()).rejects.toThrow("Mocked error")
  })

  it("should throw an error when getting the series stats", async () => {
    await expect(client.getSeriesStats()).rejects.toThrow("Mocked error")
  })
})
