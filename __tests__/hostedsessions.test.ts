import { StatusCodes } from "http-status-codes"
import IRacingSDK from "../src/sdk/iracing-sdk"
import { nockHelper } from "./helpers"

const mockResponsePath = __dirname + "/responses/"

describe("Hosted Session Functions", () => {
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

  it("should retrieve hosted session data", async () => {
    const mockFile = mockResponsePath + "hosted/hosted-sessions.json"
    nockHelper().get("/data/hosted/combined_sessions").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const hostedSessions = await client.getHostedSessions({ session_type: "combined_sessions" })
    expect(hostedSessions.success).toBe(true)
  })

  it("should retrieve session data", async () => {
    const mockFile = mockResponsePath + "hosted/sessions.json"
    nockHelper().get("/data/hosted/sessions").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const sessions = await client.getHostedSessions({ session_type: "sessions" })
    expect(sessions.success).toBe(true)
  })
})
