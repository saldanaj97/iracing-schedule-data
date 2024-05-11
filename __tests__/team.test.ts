import { StatusCodes } from "http-status-codes"
import IRacingSDK from "../src/sdk/iracing-sdk"
import { nockHelper } from "./helpers"

const mockResponsePath = __dirname + "/responses/"

describe("Team Functions", () => {
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

  it("should retrieve team data", async () => {
    const mockFile = mockResponsePath + "team/team-profile.json"
    nockHelper().get("/data/team/team_profile").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const team = await client.getTeamProfile({
      team_id: 12345,
    })
    expect(team.team_id).toEqual(-12345)
    expect(team.owner_id).toEqual(158166)
  })
})
