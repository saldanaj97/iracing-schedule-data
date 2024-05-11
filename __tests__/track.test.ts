import { StatusCodes } from "http-status-codes"
import IRacingSDK from "../src/sdk/iracing-sdk"
import { nockHelper } from "./helpers"

const mockResponsePath = __dirname + "/responses/"

describe("Track Functions", () => {
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

  it("should retrieve track data", async () => {
    const mockFile = mockResponsePath + "track/track-data.json"
    nockHelper().get("/data/track/team_data").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const trackData = await client.getTrackData()
    expect(trackData[0].track_name).toEqual("[Legacy] Lime Rock Park - 2008")
  })

  it("should retrieve track assets", async () => {
    const mockFile = mockResponsePath + "track/track-assets.json"
    nockHelper().get("/data/track/track_assets").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const trackAssets = await client.getTrackAssets()
    expect(trackAssets["1"].small_image).toEqual("limerockpark-small.jpg")
  })
})
