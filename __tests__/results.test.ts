import { StatusCodes } from "http-status-codes"
import IRacingSDK from "../src/sdk/iracing-sdk"
import { nockHelper } from "./helpers"

const mockResponsePath = __dirname + "/responses/"

describe("Result Functions", () => {
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

  it("should retrieve detailed session results", async () => {
    const mockFile = mockResponsePath + "results/results.json"
    nockHelper().get("/data/results/get").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const results = await client.getResults({ subsession_id: 68476090 })
    expect(results.subsession_id).toBe(68476090)
  })

  it("should retrieve sessions event log", async () => {
    const mockFile = mockResponsePath + "results/event-log.json"
    nockHelper().get("/data/results/event_log").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const eventLogs = await client.getEventLog({ subsession_id: 68476090, simsession_number: 0 })
    expect(eventLogs.success).toBe(true)
    expect(eventLogs.session_info.subsession_id).toBe(68476090)
  })

  it("should retrieve lap chart data", async () => {
    const mockFile = mockResponsePath + "results/lap-chart-data.json"
    nockHelper().get("/data/results/lap_chart_data").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const lapChartData = await client.getLapChartData({ subsession_id: 68476090, simsession_number: 0 })
    expect(lapChartData.success).toBe(true)
    expect(lapChartData.session_info.subsession_id).toBe(68476090)
  })

  it("should retrieve lap data", async () => {
    const mockFile = mockResponsePath + "results/lap-data.json"
    nockHelper().get("/data/results/lap_data").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const lapChartData = await client.getLapData({ subsession_id: 68476090, simsession_number: 0 })
    expect(lapChartData.success).toBe(true)
    expect(lapChartData.session_info.subsession_id).toBe(68476090)
  })

  it("should retrieve season results", async () => {
    const mockFile = mockResponsePath + "results/season-results.json"
    nockHelper().get("/data/results/season_results").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const seasonResults = await client.getSeasonResults({
      season_id: 4753,
      event_type: 5,
      race_week_num: 0,
    })
    expect(seasonResults.success).toBe(true)
    expect(seasonResults.season_id).toBe(4763)
  })
})

describe("Result Functions (no signed URL)", () => {
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

describe("Result Function Error Testing", () => {
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

  it("should throw an error when getting detailed session results", async () => {
    await expect(client.getResults({ subsession_id: 123456 })).rejects.toThrow("Mocked error")
  })

  it("should throw an error when getting event log", async () => {
    await expect(client.getEventLog({ subsession_id: 123456, simsession_number: 0 })).rejects.toThrow("Mocked error")
  })

  it("should throw an error when getting lap chart data", async () => {
    await expect(client.getLapChartData({ subsession_id: 123456, simsession_number: 0 })).rejects.toThrow(
      "Mocked error"
    )
  })

  it("should throw an error when getting lap data", async () => {
    await expect(client.getLapData({ subsession_id: 123456, simsession_number: 0 })).rejects.toThrow("Mocked error")
  })

  it("should throw an error when getting season results", async () => {
    await expect(client.getSeasonResults({ season_id: 123456 })).rejects.toThrow("Mocked error")
  })
})

describe("Result Function Error Testing (no signed URL)", () => {
  const client: IRacingSDK = new IRacingSDK("email", "password")

  beforeAll(() => {
    nockHelper()
      .post("/auth")
      .replyWithFile(StatusCodes.OK, mockResponsePath + "auth.json")
    jest.spyOn(console, "log").mockImplementation(() => {})
    jest.spyOn(client, "request").mockRejectedValue(new Error("Mocked error"))
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  // NOT WORKING FOR SOME REASON - FIX
  // it("should throw an error when getting hosted search results", async () => {
  //   nockHelper().get("/data/results/search_hosted?").replyWithError("Mocked error")
  //   await expect(
  //     client.getHostedSearchResults({
  //       host_cust_id: 345352,
  //       start_range_begin: "2024-03-31T00:00:00Z",
  //       start_range_end: "2024-04-01T00:00:00Z",
  //       finish_range_begin: "2024-03-31T00:00:00Z",
  //       finish_range_end: "2024-04-01T00:00:00Z",
  //     })
  //   ).rejects.toThrow("Mocked error")
  // })

  it("should throw an error when getting series search results(pair of params error)", async () => {
    nockHelper()
      .get("/data/results/search_series")
      .replyWithError(
        "At least one of the following pairs is required: season_year and season_quarter, start_range_begin, finish_range_begin."
      )
    await expect(client.getSeriesSearchResults({ season_year: 2024 })).rejects.toThrow(
      "At least one of the following pairs is required: season_year and season_quarter, start_range_begin, finish_range_begin."
    )
  })

  // NOT WORKING FOR SOME REASON - FIX
  // it("should throw an error when getting series search results(try-catch error)", async () => {
  //   nockHelper().get("/data/results/search_series").replyWithError("Mocked error")
  //   await expect(client.getSeriesSearchResults({ season_year: 2024, season_quarter: 1 })).rejects.toThrow(
  //     "Mocked error"
  //   )
  // })
})
