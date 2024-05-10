import Axios, { AxiosInstance, AxiosResponse } from "axios"
import { wrapper } from "axios-cookiejar-support"
import CryptoJS from "crypto-js"
import fs from "fs"
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
import {
  DetailedSessionResult,
  EventLogInfo,
  HostedSearchResults,
  LapChartInfo,
  LapData,
  SeasonSearchResults,
  SeriesSearchResults,
} from "../results/types"
import { RaceGuide, SeasonList, Series, SpectatorSubsession } from "../season/types"
import { PastSeries, RacingSeason, SeriesAssets, SeriesStats } from "../series/types"
import { appendParams } from "../utils/appendParams"
import { dateParamErrorChecking } from "../utils/errorChecking"

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
        return this.authenticated
      } catch (error) {
        this.authenticated = false
        console.error("Error occured while authenticating with iRacing API.", error)
        return this.authenticated
      }
    }
  }

  public async request<T>(path: string): Promise<T> {
    if (!this.authenticated) {
      await this.authenticate()
    }
    const response: AxiosResponse<T> = await this.iracingAPI.get(path)
    console.log(`Requesting data from ${path}...\n`)
    return response.data
  }

  public async writeToFile({ data, path }: { data: any; path: string }) {
    fs.writeFile(path, JSON.stringify(data), (err: any) => {
      if (err) {
        if (err) return console.log(`An error occured while writing data to ${path}`, err)
        return
      }
      console.log(`${path} has been created successfully!`)
    })
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

  /**
   *
   * Get the results of a subsession, if authorized to view them. series_logo image paths are relative to https://images-static.iracing.com/img/logos/series/
   *
   * Example Usage:
   *
   * ```typescript
   * getResults({subsession_id: 12345, included_licenses: true}) // Returns the results of the subsession.
   * ```
   *
   * Required Params:
   * @param subsession_id - The ID of the subsession to get results for.
   *
   * Optional Params:
   * @param included_licenses - Whether or not to include license data in the response.
   */
  public async getResults({
    subsession_id,
    included_licenses,
  }: {
    subsession_id: number
    included_licenses?: boolean
  }): Promise<DetailedSessionResult> {
    if (!subsession_id) throw new Error("Cannot complete request. Missing required parameters. (subsession_id)")
    const URL = appendParams(`/data/results/get?subsession_id=${subsession_id}`, {
      included_licenses,
    })
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const data = await this.request<DetailedSessionResult>(res.data?.link)
      return data
    } catch (error) {
      console.log("Error occured while fetching subsession results.", error)
      throw error
    }
  }

  /**
   * Get the event log of the provided subsession.
   *
   * Example Usage:
   * ```typescript
   * getEventLog({subsession_id: 12345, simsession_number: 0}) // Returns the event log for the subsession.
   * ```
   *
   * Required Params:
   * @param subsession_id - The ID of the subsession to get the event log for.
   * @param simsession_number - The simsession number to get the event log for. The main event is 0; the preceding event is -1, and so on.
   */
  public async getEventLog({
    subsession_id,
    simsession_number,
  }: {
    subsession_id: number
    simsession_number: number
  }): Promise<EventLogInfo> {
    if (subsession_id === undefined || simsession_number === undefined)
      throw new Error("Cannot complete request. Missing required parameters. (subsession_id, simsession_number)")
    const URL = `/data/results/event_log?subsession_id=${subsession_id}&simsession_number=${simsession_number}`
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const data = await this.request<EventLogInfo>(res.data?.link)
      return data
    } catch (error) {
      console.log("Error occured while fetching subsession event log.", error)
      throw error
    }
  }

  /**
   * Get the lap chart data for the provided subsession.
   *
   * Example Usage:
   * ```typescript
   * getLapChartData({subsession_id: 12345, simsession_number: 0}) // Returns the lap chart data
   * ```
   *
   * Required Params:
   * @param subsession_id - The ID of the subsession to get the event log for.
   * @param simsession_number - The simsession number to get the event log for. The main event is 0; the preceding event is -1, and so on.
   */
  public async getLapChartData({
    subsession_id,
    simsession_number,
  }: {
    subsession_id: number
    simsession_number: number
  }): Promise<LapChartInfo> {
    if (subsession_id === undefined || simsession_number === undefined)
      throw new Error("Cannot complete request. Missing required parameters. (subsession_id, simsession_number)")
    const URL = `/data/results/lap_chart_data?subsession_id=${subsession_id}&simsession_number=${simsession_number}`
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const data = await this.request<LapChartInfo>(res.data?.link)
      return data
    } catch (error) {
      console.log("Error occured while fetching subsession lap chart data.", error)
      throw error
    }
  }

  /**
   * Get the lap data for the provided subsession.
   *
   * Example Usage:
   * ```typescript
   * getLapData({subsession_id: 12345, simsession_number: 0, cust_id: 123456}) // Returns the lap chart data
   * ```
   *
   * Required Params:
   * @param subsession_id - The ID of the subsession to get the event log for.
   * @param simsession_number - The simsession number to get the event log for. The main event is 0; the preceding event is -1, and so on.
   * @param cust_id - Required if the subsession was a single-driver event. Optional for team events. Required if the subsession was a single-driver event. Optional for team events. If omitted for a team event then the laps driven by all the team's drivers will be included.
   * @param team_id - Required if subsession was a team event
   */
  public async getLapData({
    subsession_id,
    simsession_number,
    cust_id,
    team_id,
  }: {
    subsession_id: number
    simsession_number: number
    cust_id?: number
    team_id?: number
  }): Promise<LapData> {
    if (subsession_id === undefined || simsession_number === undefined)
      throw new Error("Cannot complete request. Missing required parameters. (subsession_id, simsession_number)")
    const URL = appendParams(
      `/data/results/lap_data?subsession_id=${subsession_id}&simsession_number=${simsession_number}`,
      { cust_id, team_id }
    )
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const data = await this.request<LapData>(res.data?.link)
      return data
    } catch (error) {
      console.log("Error occured while fetching subsession lap data.", error)
      throw error
    }
  }

  /**
   * Hosted session search results. One of the primary filters needs to be included. Primary filters include host, driver, team, or session name.
   *
   * Hosted and league sessions.  Maximum time frame of 90 days. Results split into one or more files with chunks of results.
   *
   * For scraping results the most effective approach is to keep track of the maximum end_time found during
   * a search then make the subsequent call using that date/time as the finish_range_begin and skip any subsessions that are duplicated.
   * Results are ordered by subsessionid which is a proxy for start time. Requires one of: start_range_begin, finish_range_begin.
   * Requires one of: cust_id, team_id, host_cust_id, session_name.
   *
   * Example Usage:
   * ```typescript
   * // Returns hosted session data for the host with customer ID 345352.
   * getHostedSearchResults({
   *    host_cust_id: 345352,
   *    start_range_begin: "2024-03-31T00:00:00Z",
   *    start_range_end: "2024-04-01T00:00:00Z",
   *    finish_range_begin: "2024-03-31T00:00:00Z",
   *    finish_range_end: "2024-04-01T00:00:00Z",
   * })
   * ```
   *
   * Required Params (One of the following is required):
   * @param cust_id - Include only sessions in which this customer participated. Ignored if team_id is supplied.
   * @param team_id - Include only sessions in which this team participated. Takes priority over cust_id if both are supplied.
   * @param host_cust_id - The host's customer ID.
   * @param session_name - Part or all of the session's name.
   *
   * Optional Params:
   * @param start_range_begin - Session start times. ISO-8601 UTC time zero offset: "2022-04-01T15:45Z".
   * @param start_range_end - ISO-8601 UTC time zero offset: "2022-04-01T15:45Z". Exclusive. May be omitted if start_range_begin is less than 90 days in the past.
   * @param finish_range_begin - 'Session finish times. ISO-8601 UTC time zero offset: "2022-04-01T15:45Z".
   * @param finish_range_end - ISO-8601 UTC time zero offset: "2022-04-01T15:45Z". Exclusive. May be omitted if finish_range_begin is less than 90 days in the past.
   * @param league_id - Include only sessions for this league.
   * @param league_session_id - Include only sessions for the league session with this ID.
   * @param car_id - One of the cars used by the session.
   * @param track_id - The ID of the track used by the session.
   * @param category_ids - License categories to include in the search.  Defaults to all. (ex. ?category_ids=1,2,3,4)
   */
  public async getHostedSearchResults({
    cust_id,
    team_id,
    host_cust_id,
    session_name,
    start_range_begin,
    start_range_end,
    finish_range_begin,
    finish_range_end,
    league_id,
    league_session_id,
    car_id,
    track_id,
    category_ids,
  }: {
    cust_id?: number
    team_id?: number
    host_cust_id?: number
    session_name?: string
    start_range_begin?: string
    start_range_end?: string
    finish_range_begin?: string
    finish_range_end?: string
    league_id?: number
    league_session_id?: number
    car_id?: number
    track_id?: number
    category_ids?: (1 | 2 | 3 | 4 | 5 | 6)[]
  }): Promise<HostedSearchResults> {
    if (!cust_id && !team_id && !host_cust_id && !session_name)
      throw new Error(
        "Cannot complete request. Missing required parameters. (cust_id, team_id, host_cust_id, session_name)"
      )

    let URL = appendParams("/data/results/search_hosted?", {
      cust_id,
      team_id,
      host_cust_id,
      session_name,
      league_id,
      league_session_id,
      car_id,
      track_id,
      category_ids: category_ids ? category_ids.join(",") : undefined,
    })

    // Error check the dates before adding to the URL
    const validDateCheck = dateParamErrorChecking({
      start_range_begin,
      start_range_end,
      finish_range_begin,
      finish_range_end,
    })

    // TODO: Potentially move this error check to the appendParams function by settings the date params to date type
    if (validDateCheck === "PASS") {
      if (start_range_begin && start_range_end) {
        URL += `&start_range_begin=${start_range_begin}&start_range_end=${start_range_end}`
      }
      if (finish_range_begin && finish_range_end) {
        URL += `&finish_range_begin=${finish_range_begin}&finish_range_end=${finish_range_end}`
      }
    }

    try {
      await this.authenticate()
      const res = await this.iracingAPI.get(URL)
      return res.data
    } catch (error) {
      console.log("Error occured while fetching hosted series results.", error)
      throw error
    }
  }

  /**
   * Official series search.  Maximum time frame of 90 days. Results split into one or more files with chunks of results.
   *
   * This request can take a bit of time to process and return the link to the results. A recommendation would be to make the URL yourself, and then use the link to get the data to verify
   * that the data is what you are looking for.
   *
   * For scraping results, the most effective approach is to keep track of the maximum end_time found during a
   * search then make the subsequent call using that date/time as the finish_range_begin and skip any subsessions that are duplicated.  Results are ordered by
   * subsessionid which is a proxy for start time but groups together multiple splits of a series when multiple series launch sessions at the same time.
   * Requires at least one of: season_year and season_quarter, start_range_begin, finish_range_begin.
   *
   * Example Usage:
   * ```typescript
   * // Returns all session data for customer 123456 in the 2024 season 2nd quarter.
   * getSeriesSearchResults({season_year: 2024, season_quarter: 2, cust_id: 123456})
   * ```
   *
   * Required Params:
   * @param season_year - The year of the season to get the event log for. Required only when using season_quarter.
   * @param season_quarter - The quarter of the year to get the event log for. Required only when using season_year.
   *
   * Optional Params:
   * @param cust_id - Include only sessions in which this customer participated. Ignored if team_id is supplied.
   * @param team_id - Include only sessions in which this team participated. Takes priority over cust_id if both are supplied.
   * @param start_range_begin - Session start times. ISO-8601 UTC time zero offset: "2022-04-01T15:45Z".
   * @param start_range_end - ISO-8601 UTC time zero offset: "2022-04-01T15:45Z". Exclusive. May be omitted if start_range_begin is less than 90 days in the past.
   * @param finish_range_begin - 'Session finish times. ISO-8601 UTC time zero offset: "2022-04-01T15:45Z".
   * @param finish_range_end - ISO-8601 UTC time zero offset: "2022-04-01T15:45Z". Exclusive. May be omitted if finish_range_begin is less than 90 days in the past.
   * @param series_id - Include only sessions for series with this ID.
   * @param race_week_num - Include only sessions with this race week number.
   * @param official_only - If true, include only sessions earning championship points. Defaults to all.
   * @param event_types - Types of events to include in the search. Defaults to all. (ex. ?event_types=2,3,4,5)
   * @param category_ids - License categories to include in the search.  Defaults to all. (ex. ?category_ids=1,2,3,4)
   */
  public async getSeriesSearchResults({
    season_year,
    season_quarter,
    cust_id,
    team_id,
    start_range_begin,
    start_range_end,
    finish_range_begin,
    finish_range_end,
    series_id,
    race_week_num,
    official_only,
    event_types,
    category_ids,
  }: {
    season_year?: number
    season_quarter?: number
    cust_id?: number
    team_id?: number
    start_range_begin?: string
    start_range_end?: string
    finish_range_begin?: string
    finish_range_end?: string
    series_id?: number
    race_week_num?: number
    official_only?: boolean
    event_types?: (2 | 3 | 4 | 5)[]
    category_ids?: (1 | 2 | 3 | 4 | 5 | 6)[]
  }): Promise<SeriesSearchResults> {
    let URL = `/data/results/search_series`

    // Error checking for required params
    if (
      !(
        (season_year !== undefined && season_quarter !== undefined) ||
        (start_range_begin !== undefined && finish_range_begin !== undefined)
      )
    ) {
      throw new Error(
        "At least one of the following pairs is required: season_year and season_quarter, start_range_begin, finish_range_begin."
      )
    }

    // Make sure if season_year is provided then season_quarter is also provided and vice versa
    if ((season_year !== undefined) !== (season_quarter !== undefined)) {
      const errorMessage = season_year === undefined ? "season_year" : "season_quarter"
      throw new Error(`${errorMessage} is required when using the other.`)
    } else if ((start_range_begin !== undefined) !== (finish_range_begin !== undefined)) {
      const errorMessage = start_range_begin === undefined ? "start_range_begin" : "finish_range_begin"
      throw new Error(`${errorMessage} is required when using the other.`)
    }

    // Append the season_year and season_quarter to the URL
    if (season_year !== undefined && season_quarter !== undefined) {
      URL += `?season_year=${season_year}&season_quarter=${season_quarter}`
    }

    // Error checking for dates
    if (
      dateParamErrorChecking({ start_range_begin, start_range_end, finish_range_begin, finish_range_end }) === "PASS"
    ) {
      if (start_range_begin && start_range_end) {
        URL += `&start_range_begin=${start_range_begin}&start_range_end=${start_range_end}`
      }
      if (finish_range_begin && finish_range_end) {
        URL += `&finish_range_begin=${finish_range_begin}&finish_range_end=${finish_range_end}`
      }
    }

    // Append the rest of the params
    const params = {
      cust_id,
      team_id,
      series_id,
      race_week_num,
      official_only,
      event_types: event_types ? event_types.join(",") : undefined,
      category_ids: category_ids ? category_ids.join(",") : undefined,
    }
    URL = appendParams(URL, params)

    try {
      await this.authenticate()
      const res = await this.iracingAPI.get(URL)
      return res.data
    } catch (error) {
      console.log("Error occured while fetching series search results.", error)
      throw error
    }
  }

  /**
   * Get all results for a season.
   *
   * Example Usage:
   * ```typescript
   * getSeasonResults({season_id: 4753, event_type: 5, race_week_num: 0}) // Returns the lap chart data
   * ```
   *
   * Required Params:
   * @param season_id - The ID of the season to get the results for.
   *
   * Optional Params:
   * @param event_type - Retrict to one event type: 2 - Practice; 3 - Qualify; 4 - Time Trial; 5 - Race.
   * @param race_week_num - The first race week of the season is 0.
   */
  public async getSeasonResults({
    season_id,
    event_type,
    race_week_num,
  }: {
    season_id: number
    event_type?: 2 | 3 | 4 | 5
    race_week_num?: number
  }): Promise<SeasonSearchResults> {
    if (!season_id) throw new Error("Cannot complete request. Missing required parameters. (season_id)")
    const URL = appendParams(`/data/results/season_results?season_id=${season_id}`, {
      event_type,
      race_week_num,
    })

    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const data = await this.request<SeasonSearchResults>(res.data?.link)
      return data
    } catch (error) {
      console.log("Error occured while fetching season results.", error)
      throw error
    }
  }

  /**
   * Retrieve the list of seasons for a specific year and quarter.
   *
   * Example Usage:
   * ```typescript
   * const seasonList = await getSeasonList({ season_year: 2024, season_quarter: 1 });
   * ```
   *
   * Required Parameters:
   * @param season_year The year of the season.
   * @param season_quarter The quarter of the season.
   */
  public async getSeasonList({
    season_year,
    season_quarter,
  }: {
    season_year: number
    season_quarter: number
  }): Promise<SeasonList> {
    if (!season_year || !season_quarter)
      throw new Error("Cannot complete request: Missing required parameters (season_year, season_quarter)")
    const URL = `/data/season/list?season_year=${season_year}&season_quarter=${season_quarter}`
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const data = await this.request<SeasonList>(res.data?.link)
      return data
    } catch (error) {
      console.log("Error occured while fetching season list.", error)
      throw error
    }
  }

  /**
   * Retrieve the race guide for a specific date.
   *
   * Example Usage:
   * ```typescript
   * const raceGuideData = await getRaceGuide({from: "2024-05-10T16:30:00Z", include_end_after_from: true });
   * ```
   *
   * Optional Parameters:
   * @param from - ISO-8601 offset format. Defaults to the current time. Include sessions with start times up to 3 hours after this time. Times in the past will be rewritten to the current time.
   * @param include_end_after_from - Include sessions which start before 'from' but end after.
   */
  public async getRaceGuide({
    from,
    include_end_after_from,
  }: {
    from?: string
    include_end_after_from?: boolean
  }): Promise<RaceGuide> {
    const URL = appendParams("/data/season/race_guide?", {
      from,
      include_end_after_from,
    })
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const data = await this.request<RaceGuide>(res.data?.link)
      return data
    } catch (error) {
      console.log("Error occured while fetching race guide")
      throw error
    }
  }

  /**
   * Retrieve the spectator subsession IDs for specific event types.
   *
   * Example Usage:
   * ```typescript
   * const spectatorSubsessionIDs = await getSpectatorSubessionIDs({ event_types: [1, 2, 3] });
   * ```
   *
   * Optional Parameters:
   * @param event_types An array of event types for which to retrieve spectator subsession IDs.
   */
  public async getSpectatorSubsessionIDs({
    event_types,
  }: {
    event_types: (1 | 2 | 3 | 4 | 5)[]
  }): Promise<SpectatorSubsession> {
    if (event_types.length === 0) throw new Error("Cannot complete request. Missing required parameters. (event_types)")
    const URL = appendParams("/data/season/spectator_subsessionids?", {
      event_types: event_types.join(","),
    })
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const data = await this.request<SpectatorSubsession>(res.data?.link)
      return data
    } catch (error) {
      console.log("Error occured while fetching spectator subsession IDs.")
      throw error
    }
  }

  /**
   * Return all the assets tied to the series.
   *
   * Image paths are relative to https://images-static.iracing.com/
   *
   * Example Usage:
   * ```typescript
   * const seriesAssets = await getAllSeriesAsssets()
   * ```
   */
  public async getAllSeriesAssets(): Promise<SeriesAssets> {
    const URL = "/data/series/assets"
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const data = await this.request<SeriesAssets>(res.data?.link)
      return data
    } catch (error) {
      console.log("Error occured while fetching series assets.")
      throw error
    }
  }

  /**
   * Retrieve the general series data for all series in a season.
   *
   * This includes basic data such as (not exhaustive):
   * - Category
   * - Series ID
   * - Series Name
   * - Series Short Name
   *
   * Example Usage:
   * ```typescript
   * const series = await getAllSeries() // Return generalized series data
   * ```
   *
   */
  public async getAllSeries(): Promise<Series[]> {
    const URL = "/data/series/get"
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const data = await this.request<Series[]>(res.data?.link)
      return data
    } catch (error) {
      console.log("Error occured while fetching all series.")
      throw error
    }
  }

  /**
   * Get all seasons for a series. Filter list by official:true for seasons with standings.
   *
   * Example Usage:
   * ```typescript
   * const pastSeasonData = await getPastSeasons(123) // Return past season data for series ID 123
   * ```
   *
   * Required Parameters:
   * @param series_id The series ID to get the seasons for.
   */
  public async getPastSeasons({ series_id }: { series_id: number }): Promise<PastSeries> {
    if (!series_id) throw new Error("Cannot complete request. Missing required parameters. (series_id)")
    const URL = `/data/series/past_seasons?series_id=${series_id}`
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const data = await this.request<PastSeries>(res.data?.link)
      return data
    } catch (error) {
      console.log("Error occured while fetching past seasons.")
      throw error
    }
  }

  /**
   * This function returns more detailed data about each series such as schedule, car classes, and track data.
   *
   * Example Usage:
   * ```typescript
   * const seriesData = await getCurrentSeasonsSeries() // Return detailed data for each series in the current season
   *
   */
  public async getCurrentSeasonsSeries(): Promise<RacingSeason[]> {
    const URL = "/data/series/seasons"
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const data = await this.request<RacingSeason[]>(res.data?.link)
      return data
    } catch (error) {
      console.log("Error occured while fetching current season series.")
      throw error
    }
  }

  /**
   * Get all the series offered by iRacing whether active or inactive.
   *
   * To get series and seasons for which standings should be available, filter the list by official: true.
   *
   * Example Usage:
   * ```typescript
   * const schedule = await getSeriesStats() // Return a list of series with stats
   * ```
   */
  public async getSeriesStats(): Promise<SeriesStats[]> {
    const URL = "/data/series/stats_series"
    try {
      await this.authenticate()
      const res = await this.iracingAPI.get<SignedURL>(URL)
      const data = await this.request<SeriesStats[]>(res.data?.link)
      return data
    } catch (error) {
      console.log("Error occured while fetching series stats.")
      throw error
    }
  }
}

export default IRacingSDK
