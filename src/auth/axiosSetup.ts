import Axios from "axios"
import { wrapper } from "axios-cookiejar-support"
import { CookieJar } from "tough-cookie"

const jar = new CookieJar()
const client = wrapper(
  Axios.create({
    jar,
  })
)

export { client, jar }
