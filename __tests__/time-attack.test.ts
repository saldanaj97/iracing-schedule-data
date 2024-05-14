import { StatusCodes } from "http-status-codes"
import IRacingSDK from "../src/sdk/iracing-sdk"
import { nockHelper } from "./helpers"

const mockResponsePath = __dirname + "/responses/"

describe("Time Attack Function Error Testing", () => {
  const client: IRacingSDK = new IRacingSDK("email", "password")

  beforeAll(() => {
    nockHelper()
      .post("/auth")
      .replyWithFile(StatusCodes.OK, mockResponsePath + "auth.json")

    // Supress console.log output
    jest.spyOn(console, "log").mockImplementation(() => {})
  })

  beforeEach(() => {
    jest.spyOn(client, "request").mockRejectedValue(new Error("Mocked error"))
    nockHelper()
      .get(/[^/]+$/)
      .replyWithFile(StatusCodes.OK, mockResponsePath + "signed-url.json")
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it("should throw an error when getting time attack data", async () => {
    await expect(client.getUserTimeAttackData({ ta_comp_season_id: 123456 })).rejects.toThrow("Mocked error")
  })

  it("should throw an error when ta_comp_season_id is missing from getUserTimeAttackData", async () => {
    await expect(client.getUserTimeAttackData({} as any)).rejects.toThrow(
      "Cannot complete request. Missing required parameters. (ta_comp_season_id)"
    )
  })
})
