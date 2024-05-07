import { StatusCodes } from "http-status-codes"
import IRacingSDK from "../src/sdk/iracing-sdk"
import { nockHelper } from "./helpers"

const mockResponsePath = __dirname + "/responses/"

describe("Initialization", () => {
  beforeEach(() => {
    nockHelper()
      .post("/auth")
      .replyWithFile(StatusCodes.OK, mockResponsePath + "auth.json")
  })
  it("should login user when initialized", async () => {
    const client = new IRacingSDK("email", "password")
    await client.authenticate()
    expect(client.authenticated).toBe(true)
  })

  it("should throw an error if credentials not provided", () => {
    expect(() => new IRacingSDK("", "")).toThrow(
      "IRacing SDK Initialization Error: Please provide a username and password when initializing the SDK."
    )
  })
})
