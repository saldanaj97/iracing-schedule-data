import { StatusCodes } from "http-status-codes"
import IRacingSDK from "../src/sdk/iracing-sdk"
import { nockHelper } from "./helpers"

const mockResponsePath = __dirname + "/responses/"

describe("Car Functions", () => {
  const client: IRacingSDK = new IRacingSDK("email", "password")
  let getResource: jest.SpyInstance

  const mockResourceGet = async (filePath: string) => {
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

  it("should retrieve car assets", async () => {
    const mockFile = mockResponsePath + "cars/car-assets.json"
    nockHelper().get("/data/car/assets").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const carAssets = await client.getCarAssets()
    expect(carAssets["1"].car_id).toBe(1)
  })

  it("should retrieve all cars available on the service", async () => {
    const mockFile = mockResponsePath + "cars/car-info-list.json"
    nockHelper().get("/data/car/get").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const cars = await client.getAllCars()
    expect(cars["0"].car_id).toBe(1)
  })
})

describe("Car Function Error Testing", () => {
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

  it("should throw an error to test error handling for getAllCars and getCarAssets", async () => {
    await expect(client.getAllCars()).rejects.toThrow("Mocked error")
    await expect(client.getCarAssets()).rejects.toThrow("Mocked error")
  })
})
