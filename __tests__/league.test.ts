import { StatusCodes } from "http-status-codes"
import IRacingSDK from "../src/sdk/iracing-sdk"
import { nockHelper } from "./helpers"

const mockResponsePath = __dirname + "/responses/"

describe("League Functions", () => {
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

  it("should retrieve custom league sessions", async () => {
    const mockFile = mockResponsePath + "league/custom-league-session.json"
    nockHelper().get("/data/league/cust_league_sessions").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const leagueSession = await client.getCustLeagueSessions({})
    expect(leagueSession.success).toBe(true)
  })

  it("should retrieve all leagues", async () => {
    const mockFile = mockResponsePath + "league/league-directory.json"
    nockHelper().get("/data/league/directory").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const directory = await client.getLeagueDirectory({})
    expect(directory.success).toBe(true)
  })

  it("should retrieve specific league", async () => {
    const mockFile = mockResponsePath + "league/league.json"
    nockHelper().get("/data/league/get").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const league = await client.getLeagueById({ league_id: 1234 })
    expect(league.league_id).toBe(1234)
  })

  it("should retrieve specific league point system", async () => {
    const mockFile = mockResponsePath + "league/league-points-system.json"
    nockHelper().get("/data/league/get_points_system").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const league = await client.getLeaguePointSystem({ league_id: 1234 })
    expect(league.success).toBe(true)
  })

  it("should retrieve cust_id owned leagues", async () => {
    const mockFile = mockResponsePath + "league/league-owner.json"
    nockHelper().get("/data/league/membership").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const league = await client.getLeagueMemberships({ cust_id: 445755 })
    expect(league[0].owner).toBe(true)
  })

  it("should retrieve specific league seasons", async () => {
    const mockFile = mockResponsePath + "league/league-seasons.json"
    nockHelper().get("/data/league/seasons").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const league = await client.getLeagueSeasons({ league_id: 4170 })
    expect(league.success).toBe(true)
  })

  it("should retrieve league standings", async () => {
    const mockFile = mockResponsePath + "league/league-standings.json"
    nockHelper().get("/data/league/season_standings").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const league = await client.getLeagueSeasonStandings({ league_id: 4170, season_id: 55337 })
    expect(league.success).toBe(true)
  })

  it("should retrieve specific league sessions in a season", async () => {
    const mockFile = mockResponsePath + "league/league-sessions.json"
    nockHelper().get("/data/league/season_sessions").replyWithFile(StatusCodes.OK, mockFile)
    await mockResourceGet(mockFile)
    const league = await client.getLeagueSeasonSessions({ league_id: 4170, season_id: 55337 })
    expect(league.success).toBe(true)
  })
})
