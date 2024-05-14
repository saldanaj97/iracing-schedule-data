import { StatusCodes } from "http-status-codes"
import IRacingSDK from "../src/sdk/iracing-sdk"
import { nockHelper } from "./helpers"

const mockResponsePath = __dirname + "/responses/"

describe("Car Class API", () => {
  const client: IRacingSDK = new IRacingSDK("email", "password")
  let getResource: jest.SpyInstance

  const mockResouceGet = async (filePath: string) => {
    getResource.mockResolvedValue(await import(filePath))
  }

  beforeAll(() => {
    nockHelper()
      .post("/auth")
      .replyWithFile(StatusCodes.OK, mockResponsePath + "auth.json")

    // Supress console.log output
    jest.spyOn(console, "log").mockImplementation(() => {})
  })

  beforeEach(() => {
    getResource = jest.spyOn(client, "request")
    nockHelper()
      .get(/[^/]+$/)
      .replyWithFile(StatusCodes.OK, mockResponsePath + "signed-url.json")
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it("should retrieve list of car classes", async () => {
    const mockFile = mockResponsePath + "carclass/car-class.json"
    nockHelper().get("/data/carclass/get").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const carAssets = await client.getCarClassData()
    expect(carAssets["0"].car_class_id).toBe(1)
  })
})

describe("Carclass Function Error Testing", () => {
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

  it("should throw an error to test error handling", async () => {
    await expect(client.getCarClassData()).rejects.toThrow("Mocked error")
  })
})
