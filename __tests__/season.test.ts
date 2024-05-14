import { StatusCodes } from "http-status-codes"
import IRacingSDK from "../src/sdk/iracing-sdk"
import { nockHelper } from "./helpers"

const mockResponsePath = __dirname + "/responses/"

describe("Season Functions", () => {
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

  it("should retrieve season list", async () => {
    const mockFile = mockResponsePath + "season/season-list.json"
    nockHelper().get("/data/season/list").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const seasonList = await client.getSeasonList({ season_year: 2024, season_quarter: 2 })
    expect(seasonList.season_year).toEqual(2024)
    expect(seasonList.season_quarter).toEqual(2)
  })

  it("should retrieve race guide", async () => {
    const mockFile = mockResponsePath + "season/race-guide.json"
    nockHelper().get("/data/season/race_guide").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const raceGuide = await client.getRaceGuide({ from: "2024-04-25", include_end_after_from: false })
    expect(raceGuide.success).toEqual(true)
  })

  it("should retrieve spectator subsession ids", async () => {
    const mockFile = mockResponsePath + "season/spectator-subsession-ids.json"
    nockHelper().get("/data/season/spectator_subsessionids").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const subsessionIds = await client.getSpectatorSubsessionIDs({ event_types: [1, 2, 3] })
    expect(subsessionIds.event_types).toEqual([2, 3])
    expect(subsessionIds.success).toEqual(true)
  })
})

describe("Season Function Error Testing", () => {
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

  it("should throw an error when getting season list", async () => {
    await expect(client.getSeasonList({ season_quarter: 2, season_year: 2024 })).rejects.toThrow("Mocked error")
  })

  it("should throw an error when season_year or season_quarter is not provided in getSeasonList", async () => {
    await expect(client.getSeasonList({} as any)).rejects.toThrow(
      "Cannot complete request. Missing required parameters. (season_year, season_quarter)"
    )
  })

  it("should throw an error when getting race guide", async () => {
    await expect(client.getRaceGuide({ from: "2024-04-25", include_end_after_from: false })).rejects.toThrow(
      "Mocked error"
    )
  })

  it("should throw an error when getting spectator subsession ids", async () => {
    await expect(client.getSpectatorSubsessionIDs({ event_types: [1, 2, 3] })).rejects.toThrow("Mocked error")
  })

  it("should throw an error when event_types is not provided in getSpectatorSubsessionIDs", async () => {
    await expect(client.getSpectatorSubsessionIDs({} as any)).rejects.toThrow(
      "Cannot complete request. Missing required parameters. (event_types)"
    )
  })
})
