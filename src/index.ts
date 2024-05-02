import dotenv from "dotenv"
import { fetchAuthCookie } from "./auth/auth"

// ENV for test environment
dotenv.config()

const main = async () => {
  const username = process.env.IRACING_USERNAME
  const password = process.env.IRACING_PASSWORD

  if (!username || !password) {
    throw new Error("Please provide a username and password in the .env file")
  }

  const auth = await fetchAuthCookie({ username: username, password: password })
  console.log(auth)
}

main()
