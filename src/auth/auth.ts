import dotenv from "dotenv"
import { client } from "./axiosSetup"

import CryptoJS from "crypto-js"

// ENV for test environment
dotenv.config()

/**
 * Function that will authenticate with iRacing API for any subsequent requests
 * @return Returns a token for the cookie-jar
 */
export const fetchAuthCookie = async ({ username, password }: { username: string; password: string }) => {
  if (!username || !password) {
    throw new Error("Please provide a username and password in the .env file")
  }
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
