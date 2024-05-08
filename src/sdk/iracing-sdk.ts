import Axios, { AxiosInstance, AxiosResponse } from "axios"
import { wrapper } from "axios-cookiejar-support"
import CryptoJS from "crypto-js"
import { CookieJar } from "tough-cookie"
import { CarDetails, CarInfo } from "../car/types"
import { CarClass } from "../carclass/types"
import { ConstantType } from "../constants/types"
import { HostedSession } from "../hosted/types"
import {
  CustomLeague,
  LeagueData,
  LeagueInfo,
  LeagueRosterResponse,
  LeagueSeasonList,
  LeagueSessionData,
  LeagueStandings,
  PointsSystemsData,
} from "../league/types"
import { appendParams } from "../utils/appendParams"

type SignedURL = {
  link: string
  expires: Date
}

class IRacingSDK {
  public authenticated: boolean
  private iracingAPI: AxiosInstance
  private email: string
  private password: string

  constructor(email: string, password: string) {
    if (!email || !password) {
      throw new Error(
        "IRacing SDK Initialization Error: Please provide a username and password when initializing the SDK."
      )
    }
    this.email = email
    this.password = password
    this.authenticated = false

    this.iracingAPI = wrapper(
      Axios.create({
        jar: new CookieJar(),
        withCredentials: true,
        baseURL: "https://members-ng.iracing.com",
      })
    )
  }

  /**
   *  Hash the password as instructed from iRacing team here: https://forums.iracing.com/discussion/15068/general-availability-of-data-api/p1
   */
  private encodeCredentials(email: string, password: string): string {
    const hash = CryptoJS.SHA256(password + email.toLowerCase())
    return CryptoJS.enc.Base64.stringify(hash)
  }

  public async authenticate() {
    if (!this.authenticated) {
      try {
        const { data } = await this.iracingAPI.post("/auth", {
          email: this.email,
          password: this.encodeCredentials(this.email, this.password),
        })

        if (data.authcode === 0) {
          this.authenticated = false
          throw new Error(data.message + "\n")
        }
        this.authenticated = true
      } catch (error) {
        this.authenticated = false
        console.error("Error occured while authenticating with iRacing API.", error)
      }
    }
  }

  public async request<T>(path: string): Promise<T> {
    if (!this.authenticated) {
      await this.authenticate()
    }
    const response: AxiosResponse<T> = await this.iracingAPI.get(path)
    console.log(`Requesting data from ${path}...\n`, response)
    return response.data
  }

  /**
   * Function that will grab the assets of the cars on the service.
   *
   * NOTE: Image paths are relative to https://images-static.iracing.com/ so you will need to append the links for the data you want to the URL
   */
  public async getCarAssets(): Promise<CarDetails> {
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>("/data/car/assets")
      const carAssets = await this.request<CarDetails>(res.data?.link)
      return carAssets
    } catch (error) {
      throw error
    }
  }

  /**
   * Function that will fetch each car available on the service
   */
  public async getAllCars(): Promise<CarInfo[]> {
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>("/data/car/get")
      const cars = await this.request<CarInfo[]>(res.data?.link)
      return cars
    } catch (error) {
      throw error
    }
  }

  /**
   * Function that will grab car class data.
   */
  public async getCarClassData(): Promise<CarClass[]> {
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>("/data/carclass/get")
      const carClassData = await this.request<CarClass[]>(res.data?.link)
      return carClassData
    } catch (error) {
      throw error
    }
  }

  /**
   * Function that will grab all the constants available on the API
   * @params constant - The constant you want to grab from the API (categories, divisions, event_types)
   */
  public async getConstants({
    constant,
  }: {
    constant: "categories" | "divisions" | "event_types"
  }): Promise<ConstantType[]> {
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<ConstantType[]>(`/data/constants/${constant}`)
      return res.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Function to retrieve hosted sessions.
   *
   * Example Usage:
   * ```typescript
   * const hostedSessions = await iRacingSDK.getHostedSessions(session_type: "sessions") // Return all hosted sessions
   * or
   * const hostedSessions = await iRacingSDK.getHostedSessions(session_type: "combined_sessions", package_id: 1) // Get hosted sessions for a specific package ID
   * ```
   *
   * Required Params:
   *  @param {string} [session_type] - The type of session to retrieve.
   *   - `sessions`: Returns all sessions that can be joined as a driver, excluding spectator and non-league pending sessions for the user.
   *   - `combined_sessions`: Returns sessions that can be joined as a driver or spectator, including non-league pending sessions for the user.
   *
   * Optional Params:
   * @param {number} [package_id] - Can only be used with "combined_sessions" for the session type. If set, returns only sessions using this car or track package ID (per the official API docs).
   */
  public async getHostedSessions({
    session_type,
    package_id,
  }: {
    session_type: "sessions" | "combined_sessions"
    package_id?: number
  }): Promise<HostedSession> {
    if (!session_type) throw new Error("Cannot complete request. Missing required parameters. (session_type)")
    let URL = ""
    if (session_type === "combined_sessions") {
      URL = `/data/hosted/combined_sessions`
      if (package_id) {
        URL = URL + `?package_id=${package_id}`
      }
    } else if (session_type === "sessions") {
      URL = `/data/hosted/sessions`
    } else {
      throw new Error("Invalid session type. 'session_type' param can only be 'sessions' or 'combined_sessions'")
    }

    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const sessionData = await this.request<HostedSession>(res.data?.link)
      return sessionData
    } catch (error) {
      throw error
    }
  }

  /**
   * Function to retrieve hosted sessions.
   *
   * Example usage:
   * ```typescript
   * const sessions = iRacingSDK.getHostedSessions({ mine: true }) //  Returns only sessions created by the user
   * or
   * const sessions = iRacingSDK.getHostedSessions({ }) //  Returns all league sessions
   * ```
   *
   * Optional Params:
   * @param {boolean} [mine] - If true, returns only sessions created by the user.
   * @param {number} [package_id] - If set, returns only sessions using this car or track package ID (per the official API docs).
   */
  public async getCustLeagueSessions({
    mine,
    package_id,
  }: {
    mine?: boolean
    package_id?: number
  }): Promise<CustomLeague> {
    let URL = `/data/league/cust_league_sessions`
    if (mine) URL += `?mine=1`
    if (package_id) URL += `?package_id=${package_id}`
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const sessionData = await this.request<CustomLeague>(res.data?.link)
      return sessionData
    } catch (error) {
      throw error
    }
  }

  /**
   * Retrieve league directory info with OPTIONAL parameters in the form of an object.
   *
   * Example usage:
   * ```typescript
   * iRacingSDK.getLeagueDirectory({}) // Returns all leagues
   * or
   * iRacingSDK.getLeagueDirectory({ search: "NASCAR"}) // Returns all leagues with "NASCAR" in the name, description, owner, or league ID.
   * ```
   *
   * Optional Params (only choose one for now):
   * - `search`: Will search against league name, description, owner, and league ID.
   * - `tag`: One or more tags, comma-separated.
   * - `restrict_to_member`: If true include only leagues for which customer is a member.
   * - `restrict_to_recruiting`: If true include only leagues which are recruiting.
   * - `restrict_to_friends`: If true include only leagues owned by a friend.
   * - `restrict_to_watched`: If true include only leagues owned by a watched member.
   * - `minimum_roster_count`: If set include leagues with at least this number of members.
   * - `maximum_roster_count`: If set include leagues with no more than this number of members.
   * - `lowerbound`: First row of results to return.  Defaults to 1.
   * - `upperbound`: Last row of results to results to lowerbound + 39.
   * - `sort`: One of relevance, teamname, rostercount. Displayname is owners's name. Defaults to relevance.
   * - `order`: "One of asc or desc.  Defaults to asc.
   */
  public async getLeagueDirectory({
    search,
    tag,
    restrict_to_member,
    restrict_to_recruiting,
    restrict_to_friends,
    restrict_to_watched,
    minimum_roster_count,
    maximum_roster_count,
    lowerbound,
    upperbound,
    sort,
    order,
  }: {
    search?: string
    tag?: string
    restrict_to_member?: boolean
    restrict_to_recruiting?: boolean
    restrict_to_friends?: boolean
    restrict_to_watched?: boolean
    minimum_roster_count?: number
    maximum_roster_count?: number
    lowerbound?: number
    upperbound?: number
    sort?: string
    order?: string
  }): Promise<CustomLeague> {
    let URL = "/data/league/directory"

    if (search !== undefined) {
      encodeURIComponent(search)
      URL += `?search=${search}`
    }

    URL = appendParams("/data/league/directory", {
      search,
      tag,
      restrict_to_member,
      restrict_to_recruiting,
      restrict_to_friends,
      restrict_to_watched,
      minimum_roster_count,
      maximum_roster_count,
      lowerbound,
      upperbound,
      sort,
      order,
    })

    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const leagueData = await this.request<CustomLeague>(res.data?.link)
      return leagueData
    } catch (error) {
      throw error
    }
  }

  /**
   * Retrieve a specific league by league ID.
   *
   * Example usage:
   * ```typescript
   * iRacingSDK.getSpecificLeague({ league_id: 12345 }) // Returns the league with the ID of 12345
   * ```
   *
   * Required Params:
   * @param {number} league_id - The ID of the league you want to retrieve.
   *
   * Optional Params:
   * @param {boolean} include_licenses - For faster responses, only request when necessary. Return licenses for each member.
   */
  public async getLeagueById({
    league_id,
    include_licenses,
  }: {
    league_id: number
    include_licenses?: boolean
  }): Promise<LeagueInfo> {
    let URL = `/data/league/get?league_id=${league_id}`
    if (include_licenses !== undefined) include_licenses === true ? (URL += `&include_licenses=1`) : null
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const leagueData = await this.request<LeagueInfo>(res.data?.link)
      return leagueData
    } catch (error) {
      throw error
    }
  }

  /**
   * Retrieve a specific league by league ID.
   *
   * Example usage:
   * ```typescript
   * iRacingSDK.getLeaguePointSystem({ league_id: 12345 }) // Returns the league with the ID of 12345
   *
   * OR
   *
   * iRacingSDK.getLeaguePointSystem({ league_id: 12345, season_id: 12345 }) // Returns the league with the ID of 12345 and the season with the ID of 12345
   * ```
   *
   * Required Params:
   * @param {number} league_id - The ID of the league you want to retrieve.
   *
   * Optional Params:
   * @param {number} season_id - If included and the season is using custom points (points_system_id:2) then the custom points option is included in the returned list. Otherwise the custom points option is not returned.
   */
  public async getLeaguePointSystem({
    league_id,
    season_id,
  }: {
    league_id: number
    season_id?: number
  }): Promise<PointsSystemsData> {
    if (!league_id) throw new Error("Cannot complete request. Missing required parameters. (league_id)")
    const URL = appendParams(`/data/league/get_points_system?league_id=${league_id}`, {
      season_id,
    })
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const pointSystem = await this.request<PointsSystemsData>(res.data?.link)
      return pointSystem
    } catch (error) {
      throw error
    }
  }

  /**
   * Retrieve a list of leagues the user owns if not set to private.
   *
   * Example usage:
   * ```typescript
   * iRacingSDK.getLeaguesOwnedByCustomer({ cust_id: 12345, include_league: true }) // Returns the leagues customer 12345 if the owner of if not set to private
   * ```
   *
   * Required Params:
   * @param {number} cust_id - If different from the authenticated member, the following resrictions apply:
   * - Caller cannot be on requested customer's block list or an empty list will result;
   * - Requested customer cannot have their online activity prefrence set to hidden or an empty list will result;
   * - Only leagues for which the requested customer is an admin and the league roster is not private are returned
   * @param {boolean} include_league - If true, includes the league information in the response.
   */
  public async getLeagueMemberships({
    cust_id,
    include_league,
  }: {
    cust_id: number
    include_league?: boolean
  }): Promise<LeagueData[]> {
    if (!cust_id) throw new Error("Cannot complete request. Missing required parameters. (cust_id)")
    const URL = appendParams(`/data/league/membership?cust_id=${cust_id}`, {
      include_league,
    })
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const leagueMemberships = await this.request<LeagueData[]>(res.data?.link)
      return leagueMemberships
    } catch (error) {
      throw error
    }
  }

  /**
   * Retireve a leagues roster list.
   *
   * Example usage:
   * ```typescript
   * iRacingSDK.getLeagueRoster({ league_id: 12345 }) // Returns the roster for the league with the ID of 12345
   * ```
   *
   * Required Params:
   * @param {number} league_id - The ID of the league you want to retrieve the roster for.
   *
   * Optional Params:
   * @param {boolean} include_licenses - For faster responses, only request when necessary.
   */
  public async getLeagueRoster({
    league_id,
    include_licenses,
  }: {
    league_id: number
    include_licenses?: boolean
  }): Promise<LeagueRosterResponse> {
    if (!league_id) throw new Error("Cannot complete request. Missing required parameters. (league_id)")
    const URL = appendParams(`/data/league/roster?league_id=${league_id}`, { include_licenses })
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<LeagueRosterResponse>(URL)
      return res.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Retrieve the past and current seasons for a specific league.
   *
   * Example usage:
   * ```typescript
   * iRacingSDK.getLeagueSeasons({ league_id: 12345 }) // Returns the seasons for the league with the ID of 12345
   * ```
   *
   * Required Params:
   * @param {number} league_id - The ID of the league you want to retrieve the seasons for.
   *
   * Optional Params:
   * @param {boolean} retired - If true, include retired seasons.
   */
  public async getLeagueSeasons({
    league_id,
    retired,
  }: {
    league_id: number
    retired?: boolean
  }): Promise<LeagueSeasonList> {
    const URL = appendParams(`/data/league/seasons?league_id=${league_id}`, { retired })
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const leagueSeasons = await this.request<LeagueSeasonList>(res.data?.link)
      return leagueSeasons
    } catch (error) {
      throw error
    }
  }

  /**
   * Retrieve the standings for a specific league and season.
   *
   * Example usage:
   * ```typescript
   * iRacingSDK.getLeagueSeasonStandings({ league_id: 12345 }) // Returns the sessions for the league with the ID of 12345
   * ```
   *
   * Required Params:
   * @param {number} league_id - The ID of the league you want to retrieve the sessions for.
   * @param {number} season_id - The ID of the season you want to retrieve the sessions for.
   *
   * Optional Params:
   * @param {number} car_class_id - The ID of the car class
   * @param {number} car_id - If car_class_id is included then the standings are for the car in that car class, otherwise they are for the car across car classes.
   */
  public async getLeagueSeasonStandings({
    league_id,
    season_id,
    car_class_id,
    car_id,
  }: {
    league_id: number
    season_id: number
    car_class_id?: number
    car_id?: number
  }): Promise<LeagueStandings> {
    if (!league_id || !season_id)
      throw new Error("Cannot complete request. Missing required parameters. (league_id, season_id)")
    const URL = appendParams(`/data/league/season_standings?league_id=${league_id}&season_id=${season_id}`, {
      car_class_id,
      car_id,
    })
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const standings = await this.request<LeagueStandings>(res.data?.link)
      return standings
    } catch (error) {
      throw error
    }
  }

  /**
   * Retrieve each session in a season for a specific league.
   *
   * Example usage:
   * ```typescript
   * iRacingSDK.getLeagueSeasonSessions({ league_id: 12345, season_id: 12345 }) // Returns the sessions for the league with the ID of 12345
   * ```
   *
   * Required Params:
   * @param {number} league_id - The ID of the league you want to retrieve the sessions for.
   * @param {number} season_id - The ID of the season you want to retrieve the sessions for.
   *
   * Optional Params:
   * @param {boolean} results_only - If true, include only sessions for which results are available.
   */
  public async getLeagueSeasonSessions({
    league_id,
    season_id,
    results_only,
  }: {
    league_id: number
    season_id: number
    results_only?: boolean
  }): Promise<LeagueSessionData> {
    if (!league_id || !season_id)
      throw new Error("Cannot complete request. Missing required parameters. (league_id, season_id)")
    const URL = appendParams(`data/league/season_sessions?league_id=${league_id}&season_id=${season_id}`, {
      results_only,
    })
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const sessions = await this.request<LeagueSessionData>(res.data?.link)
      return sessions
    } catch (error) {
      throw error
    }
  }
}

export default IRacingSDK
