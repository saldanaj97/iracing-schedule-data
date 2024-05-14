import { StatusCodes } from "http-status-codes"
import IRacingSDK from "../src/sdk/iracing-sdk"
import { nockHelper } from "./helpers"

const mockResponsePath = __dirname + "/responses/"

describe("Constants API", () => {
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
  })

  it("should retrieve list of constants(categories)", async () => {
    const mockFile = mockResponsePath + "constants/categories.json"
    nockHelper().get("/data/constants/categories").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const categories = await client.getConstants({ constant: "categories" })
    expect(categories[0].value).toBe(1)
  })

  it("should retrieve list of constants(divisions)", async () => {
    const mockFile = mockResponsePath + "constants/divisions.json"
    nockHelper().get("/data/constants/divisions").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const divisions = await client.getConstants({ constant: "divisions" })
    expect(divisions[0].label).toBe("ALL")
  })

  it("should retrieve list of constants(event_types)", async () => {
    const mockFile = mockResponsePath + "constants/event_types.json"
    nockHelper().get("/data/constants/event_types").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const event_types = await client.getConstants({ constant: "event_types" })
    expect(event_types[0].value).toBe(2)
  })
})

describe("Constant Function Error Testing", () => {
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

  it("should throw an error to test error handling", async () => {
    nockHelper().get("/data/constants/categories").replyWithError("Mocked error")
    await expect(client.getConstants({ constant: "categories" })).rejects.toThrow("Mocked error")
  })

  it("should throw an error when constant is missing from getConstants", async () => {
    await expect(client.getConstants({} as any)).rejects.toThrow(
      "Cannot complete request. Missing required parameters. (constant)"
    )
  })
})
