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
import { Club, Country, Driver } from "../lookup/types"
import {
  Award,
  AwardResponse,
  ChartData,
  MemberData,
  MemberProfile,
  ParticipationCreditData,
  PersonalInfo,
} from "../member/types"
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
    await this.authenticate()
    try {
      const res = await this.iracingAPI.get<SignedURL>("/data/car/assets")
      const carAssets = await this.request<CarDetails>(res.data?.link)
      return carAssets
    } catch (error) {
      console.log("Error occured while fetching car assets.", error)
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
      console.log("Error occured while fetching car info.", error)
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
      console.log("Error occured while fetching car class data.", error)
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
      console.log("Error occured while fetching constants.", error)
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
      console.log("Error occured while fetching hosted sessions.", error)
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
      console.log("Error occured while fetching custom league sessions.", error)
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
      console.log("Error occured while fetching league directory.", error)
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
      console.log("Error occured while fetching league info.", error)
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
      console.log("Error occured while fetching league point system.", error)
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
      console.log("Error occured while fetching league memberships.", error)
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
      console.log("Error occured while fetching league roster.", error)
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
      console.log("Error occured while fetching league seasons.", error)
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
      console.log("Error occured while fetching league standings.", error)
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
      console.log("Error occured while fetching league sessions.", error)
      throw error
    }
  }

  /**
   * Return the different clubs available on the service. Returns an earlier history if requirested quarter does not have a club history.
   *
   * Example usage:
   * ```typescript
   *  lookupClubHistory({ season_year: 2021, season_quarter: 1 }) // Returns club history for 2021S1
   * ```
   *
   * Required Params:
   * @param season_year: The year of the season you want to look up
   * @param season_quarter: The quarter of the season you want to look up
   */
  public async lookupClubHistory({
    season_year,
    season_quarter,
  }: {
    season_year: number
    season_quarter: number
  }): Promise<Club[]> {
    if (!season_year || !season_quarter)
      throw new Error("Cannot complete request. Missing required parameters. (season_year, season_quarter)")
    const URL = `/data/lookup/club_history?season_year=${season_year}&season_quarter=${season_quarter}`
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const clubHistory = await this.request<Club[]>(res.data?.link)
      return clubHistory
    } catch (error) {
      console.log("Error occured while fetching club history.", error)
      throw error
    }
  }

  /**
   * Return the countries and their codes available on the service.
   *
   * Example usage:
   * ```typescript
   * lookupCountries() // Returns all countries and their codes
   * ```
   */
  public async lookupCountries(): Promise<Country[]> {
    const URL = "/data/lookup/countries"
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const countries = await this.request<Country[]>(res.data?.link)
      return countries
    } catch (error) {
      console.log("Error occured while fetching countries.", error)
      throw error
    }
  }

  /**
   * Return the driver on the service with the given customer_id (search_term).
   *
   * Example usage:
   * ```typescript
   * lookupDrivers({search_term: 123456}) // Returns
   * ```
   *
   * Required Params:
   * @param cust_id - The customer_id of the driver you want to look up.
   *
   * Optional Params:
   * @param league_id - ID of the league you want to search in. Narrows the search to the roster of the given league.
   */
  public async lookupDrivers({
    cust_id,
    league_id,
  }: {
    cust_id: number | string
    league_id?: number
  }): Promise<Driver[]> {
    if (!cust_id) throw new Error("Cannot complete request. Missing required parameters. (cust_id)")
    const URL = appendParams(`/data/lookup/drivers?search_term=${cust_id}`, {
      league_id,
    })
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const drivers = await this.request<Driver[]>(res.data?.link)
      return drivers
    } catch (error) {
      console.log("Error occured while fetching drivers.", error)
      throw error
    }
  }

  /**
   * Return a list of awards for a specific member. If no cust_id is provided, the function will return the awards for the authenticated user.
   *
   * Example Usage:
   * ```typescript
   * getMemberAwards({ cust_id: 12345 })
   * ```
   *
   * Optional Params:
   * @param cust_id: The member ID of the user to retrieve awards for.
   */
  public async getMemberAwards({ cust_id }: { cust_id?: number }): Promise<Award[]> {
    let URL = "/data/member/awards"
    if (cust_id) URL += `?cust_id=${cust_id}`
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<AwardResponse>(URL)
      const data = await this.request<Award[]>(res.data?.data_url)
      return data
    } catch (error) {
      console.error("Error occured while fetching member awards.", error)
      throw error
    }
  }

  /**
   * Retrieve the chart data for a member. If no cust_is is provided, the function will return the chart data for the authenticated user.
   *
   * Example Usage:
   * ```typescript
   * getMemberChartData({ cust_id: 12345, category_id: 1, chart_type: '1' })
   * ```
   *
   * Required Params:
   * @param category_id - The category ID of the chart data to retrieve. (1 - Oval; 2 - Road; 3 - Dirt oval; 4 - Dirt road)
   * @param chart_type - The type of chart data to retrieve. (1 - iRating; 2 - TT Rating; 3 - License/SR)
   *
   * Optional params:
   * @param cust_id - The member ID of the user to retrieve chart data for.
   */
  public async getMemberChartData({
    cust_id,
    category_id,
    chart_type,
  }: {
    cust_id?: number
    category_id: 1 | 2 | 3 | 4 | 5
    chart_type: 1 | 2 | 3
  }): Promise<ChartData> {
    if (!category_id || !chart_type)
      throw new Error("Cannot complete request: Missing required parameters. (category_id, chart_type)")
    const URL = appendParams(`/data/member/chart_data?category_id=${category_id}`, {
      cust_id,
      chart_type,
    })
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const data = await this.request<ChartData>(res.data?.link)
      return data
    } catch (error) {
      console.error("Error occured while fetching member chart data.", error)
      throw error
    }
  }

  /**
   * Retrieve the club data for a member. If no cust_id is provided, the function will return the club data for the authenticated user.
   *
   * Example Usage:
   * ```typescript
   * getMemberData({ cust_ids: "693109, 82554" }) // Returns club data for the specified members
   * ```
   *
   * Required Params:
   * @param cust_ids: The member ID of the user to retrieve club data for. (ie. "123456, 12345" for multiple ids, or "123456" for a single id)
   *
   * Optional Params:
   * @param included_licenses: Whether or not to include license data in the response. Defaults to false.
   */
  public async getMemberData({
    cust_ids,
    included_licenses,
  }: {
    cust_ids: string
    included_licenses?: boolean
  }): Promise<MemberData> {
    const URL = appendParams(`/data/member/get?${cust_ids}`, {
      included_licenses,
    })
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const data = await this.request<MemberData>(res.data?.link)
      return data
    } catch (error) {
      console.error("Error occured while fetching member data.", error)
      throw error
    }
  }

  /**
   * Retrieve personal info.
   *
   * Example Usage:
   * ```typescript
   * getPersonalInfo()
   * ```
   */
  public async getPersonalInfo(): Promise<PersonalInfo> {
    //TODO: Add return type
    const URL = "/data/member/info"
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const data = await this.request<PersonalInfo>(res.data?.link)
      return data
    } catch (error) {
      console.error("Error occured while fetching personal awards.", error)
      throw error
    }
  }

  /**
   * Retrieve personal participation credit data. Participation credits are rewarded for participating in certain licensed series and are awarded at the end
   * of each season.
   * Example Usage:
   * ```typescript
   * getPersonalParticipationCredits()
   * ```
   */
  public async getPersonalParticipationCredits(): Promise<ParticipationCreditData[]> {
    //TODO: Add return type
    const URL = "/data/member/participation_credits"
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const data = await this.request<ParticipationCreditData[]>(res.data?.link)
      return data
    } catch (error) {
      console.error("Error occured while fetching personal participation credits.", error)
      throw error
    }
  }

  /**
   * Retrieve the specific member's profile. If no cust_id is provided, defaults to the authenticated user.
   *
   * Example Usage:
   * ```typescript
   * getMemberProfile({cust_id: 12345}) // Returns the profile for the specified member
   * ```
   *
   * Required Params:
   * @param cust_id: The member ID of the user to retrieve profile data for. Defaults to the authenticated member.
   */
  public async getMemberProfile({ cust_id }: { cust_id?: number }): Promise<MemberProfile> {
    //TODO: Add return type
    const URL = `/data/member/profile${cust_id ? `?cust_id=${cust_id}` : ""}`
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const data = await this.request<MemberProfile>(res.data?.link)
      return data
    } catch (error) {
      console.error("Error occured while fetching member awards.", error)
      throw error
    }
  }
}

export default IRacingSDK
