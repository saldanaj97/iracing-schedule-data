import { StatusCodes } from "http-status-codes"
import IRacingSDK from "../src/sdk/iracing-sdk"
import { nockHelper } from "./helpers"

const mockResponsePath = __dirname + "/responses/"

describe("Result Functions", () => {
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

  it("should retrieve detailed session results", async () => {
    const mockFile = mockResponsePath + "results/results.json"
    nockHelper().get("/data/results/get").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const results = await client.getResults({ subsession_id: 68476090 })
    expect(results.subsession_id).toBe(68476090)
  })

  it("should retrieve sessions event log", async () => {
    const mockFile = mockResponsePath + "results/event-log.json"
    nockHelper().get("/data/results/event_log").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const eventLogs = await client.getEventLog({ subsession_id: 68476090, simsession_number: 0 })
    expect(eventLogs.success).toBe(true)
    expect(eventLogs.session_info.subsession_id).toBe(68476090)
  })

  it("should retrieve lap chart data", async () => {
    const mockFile = mockResponsePath + "results/lap-chart-data.json"
    nockHelper().get("/data/results/lap_chart_data").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const lapChartData = await client.getLapChartData({ subsession_id: 68476090, simsession_number: 0 })
    expect(lapChartData.success).toBe(true)
    expect(lapChartData.session_info.subsession_id).toBe(68476090)
  })

  it("should retrieve lap data", async () => {
    const mockFile = mockResponsePath + "results/lap-data.json"
    nockHelper().get("/data/results/lap_data").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const lapChartData = await client.getLapData({ subsession_id: 68476090, simsession_number: 0 })
    expect(lapChartData.success).toBe(true)
    expect(lapChartData.session_info.subsession_id).toBe(68476090)
  })

  it("should retrieve season results", async () => {
    const mockFile = mockResponsePath + "results/season-results.json"
    nockHelper().get("/data/results/season_results").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const seasonResults = await client.getSeasonResults({
      season_id: 4753,
      event_type: 5,
      race_week_num: 0,
    })
    expect(seasonResults.success).toBe(true)
    expect(seasonResults.season_id).toBe(4763)
  })
})

describe("Result Functions that do not return signed URL", () => {
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
      .replyWithFile(StatusCodes.OK, mockResponsePath + "results/hosted-search-results.json")
  })

  it("should retrieve hosted search results", async () => {
    const mockFile = mockResponsePath + "results/hosted-search-results.json"
    nockHelper().get("/data/results/search_hosted").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const hostedSearchResults = await client.getHostedSearchResults({
      host_cust_id: 345352,
      start_range_begin: "2024-03-31T00:00:00Z",
      start_range_end: "2024-04-01T00:00:00Z",
      finish_range_begin: "2024-03-31T00:00:00Z",
      finish_range_end: "2024-04-01T00:00:00Z",
    })
    expect(hostedSearchResults.data.success).toBe(true)
  })

  it("should retrieve series search results", async () => {
    const mockFile = mockResponsePath + "results/series-search-results.json"
    nockHelper().get("/data/results/search_series").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const seriesSearchResults = await client.getSeriesSearchResults({
      season_year: 2024,
      season_quarter: 2,
      cust_id: 123456,
    })
    expect(seriesSearchResults.data.success).toBe(true)
  })
})
