import { StatusCodes } from "http-status-codes"
import IRacingSDK from "../src/sdk/iracing-sdk"
import { nockHelper } from "./helpers"

const mockResponsePath = __dirname + "/responses/"

describe("Car Class API", () => {
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

  it("should retrieve list of car classes", async () => {
    const mockFile = mockResponsePath + "carclass/car-class.json"
    nockHelper().get("/data/carclass/get").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const carAssets = await client.getCarClassData()
    expect(carAssets["0"].car_class_id).toBe(1)
  })

  it("should retrieve list of car classes", async () => {
    // Define the path to the mock JSON file
    const mockFile = mockResponsePath + "carclass/car-class.json"
    // Mock the successful HTTP request with a file response
    nockHelper().get("/data/carclass/get").replyWithFile(StatusCodes.OK, mockFile)
    // Mock the function that is being called within the try block to throw an error
    jest.spyOn(client, "getCarClassData").mockRejectedValue(new Error("Mocked error"))

    // Expect that the function will reject with an error
    await expect(client.getCarClassData()).rejects.toThrow("Mocked error")

    // Optionally, you can assert other behaviors or states based on the error condition if needed
  })
})
