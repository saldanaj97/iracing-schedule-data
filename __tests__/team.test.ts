import { StatusCodes } from "http-status-codes"
import IRacingSDK from "../src/sdk/iracing-sdk"
import { nockHelper } from "./helpers"

const mockResponsePath = __dirname + "/responses/"

describe("Team Functions", () => {
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

  it("should retrieve team data", async () => {
    const mockFile = mockResponsePath + "team/team-profile.json"
    nockHelper().get("/data/team/team_profile").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const team = await client.getTeamProfile({
      team_id: 12345,
    })
    expect(team.team_id).toEqual(-12345)
    expect(team.owner_id).toEqual(158166)
  })
})

describe("Team Function Error Testing", () => {
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

  it("should throw an error when getting team data", async () => {
    nockHelper().get("/data/team/team_profile?").replyWithError("Mocked error")
    await expect(client.getTeamProfile({ team_id: 12345 })).rejects.toThrow("Mocked error")
  })
})
