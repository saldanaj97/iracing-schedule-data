import { StatusCodes } from "http-status-codes"
import IRacingSDK from "../src/sdk/iracing-sdk"
import { nockHelper } from "./helpers"

const mockResponsePath = __dirname + "/responses/"

describe("Series Functions", () => {
  const client: IRacingSDK = new IRacingSDK("email", "password")
  let getResource: jest.SpyInstance

  const mockResouceGet = async (filePath: string) => {
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
    await mockResouceGet(mockFile)
    const assets = await client.getAllSeriesAssets()
    expect(assets["32"].series_id).toEqual(32)
  })

  it("should retrieve all series", async () => {
    const mockFile = mockResponsePath + "series/all-series.json"
    nockHelper().get("/data/series/get").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const series = await client.getAllSeries()
    expect(series[0].series_id).toEqual(514)
    expect(series[0].series_name).toEqual("GR Buttkicker Cup - Fixed")
  })

  it("should retrieve past season data for a series", async () => {
    const mockFile = mockResponsePath + "series/past-seasons.json"
    nockHelper().get("/data/series/past_seasons").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const pastSeason = await client.getPastSeasons({ series_id: 299 })
    expect(pastSeason.success).toEqual(true)
    expect(pastSeason.series_id).toEqual(299)
  })

  it("should retrieve all the current seasons series", async () => {
    const mockFile = mockResponsePath + "series/current-seasons-series.json"
    nockHelper().get("/data/series/seasons").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const currentSeason = await client.getCurrentSeasonsSeries()
    expect(currentSeason[0].season_id).toEqual(4865)
    expect(currentSeason[1].season_id).toEqual(4699)
  })

  it("should retrieve the series stats", async () => {
    const mockFile = mockResponsePath + "series/series-stats.json"
    nockHelper().get("/data/series/stats_series").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const seriesStats = await client.getSeriesStats()
    expect(seriesStats[0].series_id).toEqual(102)
    expect(seriesStats[0].category_id).toEqual(1)
  })
})
