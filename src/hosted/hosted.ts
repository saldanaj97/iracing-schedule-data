import { appendParams } from "../utils/appendParams"
import { client } from "../utils/axiosSetup"
import { HostedSession } from "./types"

/**
 * Function to retrieve hosted sessions.
 * @param {number} [package_id] - If set, returns only sessions using this car or track package ID (per the official API docs).
 * @param {string} [session_type] - The type of session to retrieve.
 *   - `sessions`: Returns all sessions that can be joined as a driver, excluding spectator and non-league pending sessions for the user.
 *   - `combined_sessions`: Returns sessions that can be joined as a driver or spectator, including non-league pending sessions for the user.
 * @returns {Promise<HostedSession[] | undefined>} A list of sessions that can be joined as a driver or spectator, including non-league pending sessions for the user.
 */
export const getHostedSessions = async ({
  package_id,
  session_type,
}: {
  package_id?: number
  session_type: "sessions" | "combined_sessions"
}): Promise<HostedSession[] | undefined> => {
  let URL = ""

  if (session_type === "combined_sessions") {
    URL = appendParams(`https://members-ng.iracing.com/data/hosted/combined_sessions?`, {
      package_id,
    })
  } else if (session_type === "sessions") {
    URL = `https://members-ng.iracing.com/data/hosted/sessions`
  } else {
    throw new Error("Invalid session type. 'session_type' param can only be 'sessions' or 'combined_sessions'")
  }

  try {
    const { link } = await client.get(URL).then((response) => response.data)
    const data = await client.get(link).then((response) => response.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}
