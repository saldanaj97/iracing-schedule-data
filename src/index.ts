import dotenv from "dotenv"
import fs from "fs"
import { dirname } from "path"
import { client } from "./utils/axiosSetup"

import CryptoJS from "crypto-js"

// ENV for test environment
dotenv.config()

/**
 * Function that will authenticate with iRacing API for any subsequent requests
 * @return Returns a token for the cookie-jar
 */
export const fetchAuthCookie = async ({ username, password }: { username: string; password: string }) => {
  // Hash the password as instructed from iRacing team here: https://forums.iracing.com/discussion/15068/general-availability-of-data-api/p1
  const hash = CryptoJS.SHA256(password + username.toLowerCase())
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash)

  // Make the request to the link provided in the docs and retrieve the cookie data for subsequent requests
  try {
    console.log("\nAttempting to authenticate with iRacing API...\n")
    const { data } = await client.post("https://members-ng.iracing.com/auth", {
      email: username,
      password: hashInBase64,
    })
    if (data.authcode === 0) throw new Error(`Failed to authenticate with iRacing API. ${data.message}\n`)
    console.log("\nSuccessfully authenticated with iRacing API\n")
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Function to write JSON data to specified file.
 * @returns: N/A
 */
// TODO: Add error handling/logging/remove altogether potentially
export const writeDataToFile = ({ jsonData, fileDir }: { jsonData: string; fileDir: string }) => {
  const directory = dirname(fileDir)
  if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true })

  fs.writeFile(fileDir, jsonData, (error) => {
    if (error) {
      console.error(`An error occurred while writing data to ${fileDir}:`, error)
    } else {
      console.log(`Data has been successfully written to ${fileDir}`)
    }
  })
}

const main = async () => {
  const username = process.env.IRACING_USERNAME
  const password = process.env.IRACING_PASSWORD

  if (!username || !password) {
    console.error("Please provide a username and password in the .env file")
    return
  }

  const authData = await fetchAuthCookie({ username: "saldanaj97@gmail.com", password: "JuaSal97!" })
  if (!authData) return

  // const seriesData = await getDetailedSeriesData()
  // if (!seriesData) return

  // const allCars = await getListOfAllCars()
  // if (!allCars) return

  // const allTracks = await getTrackData()
  // if (!allTracks) return

  // const constants = await getConstants({ constant: "event_types" })
  // if (!constants) return

  // const hostedSessions = await getHostedSessions({ session_type: "sessions" })
  // if (!hostedSessions) return

  // const hostedSessions = await getCustomLeagueSession({})
  // if (!hostedSessions) return

  // const leagueDirectory = await getLeagueDirectory({
  //   search: "NASCAR",
  // })
  // if (!leagueDirectory) return
}

main()
