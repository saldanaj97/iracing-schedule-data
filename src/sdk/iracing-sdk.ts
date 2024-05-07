import Axios, { AxiosInstance, AxiosResponse } from "axios"
import { wrapper } from "axios-cookiejar-support"
import CryptoJS from "crypto-js"
import { CookieJar } from "tough-cookie"
import { CarDetails, CarInfo } from "../car/types"
import { CarClass } from "../carclass/types"
import { ConstantType } from "../constants/types"
import { HostedSession } from "../hosted/types"

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
}

export default IRacingSDK
