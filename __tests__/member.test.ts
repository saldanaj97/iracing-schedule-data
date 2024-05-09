import { StatusCodes } from "http-status-codes"
import IRacingSDK from "../src/sdk/iracing-sdk"
import { nockHelper } from "./helpers"

const mockResponsePath = __dirname + "/responses/"

describe("Member Functions", () => {
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

  it("should retrieve member awards", async () => {
    const mockFile = mockResponsePath + "member/member-awards.json"
    nockHelper().get("/data/member/awards").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const awards = await client.getMemberAwards({ cust_id: 123456 })
    expect(awards[0].award_id).toBe(88)
  })

  it("should retrieve member chart data", async () => {
    const mockFile = mockResponsePath + "member/chart-data.json"
    nockHelper().get("/data/member/chart_data").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const chartData = await client.getMemberChartData({ chart_type: 2, category_id: 1 })
    expect(chartData.success).toBe(true)
  })

  it("should retrieve member data", async () => {
    const mockFile = mockResponsePath + "member/member-data.json"
    nockHelper().get("/data/lookup/get").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const memberData = await client.getMemberData({ cust_ids: "123456" })
    expect(memberData.success).toBe(true)
  })

  it("should retrieve personal info", async () => {
    const mockFile = mockResponsePath + "member/personal-info.json"
    nockHelper().get("/data/lookup/info").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const personalInfo = await client.getPersonalInfo()
    expect(personalInfo.display_name).toBe("Juan Saldana")
  })

  it("should retrieve personal participation credits", async () => {
    const mockFile = mockResponsePath + "member/participation-credits.json"
    nockHelper().get("/data/lookup/participation_credits").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const participationCredits = await client.getPersonalParticipationCredits()
    expect(participationCredits[0].cust_id).toBe(693109)
  })

  it("should retrieve member profile", async () => {
    const mockFile = mockResponsePath + "member/member-profile.json"
    nockHelper().get("/data/lookup/profile").replyWithFile(StatusCodes.OK, mockFile)
    await mockResouceGet(mockFile)
    const memberProfile = await client.getMemberProfile({ cust_id: 123456 })
    expect(memberProfile.member_info.cust_id).toBe(693109)
  })
})