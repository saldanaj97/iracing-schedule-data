import { client } from "../auth/axiosSetup"
import { appendParams } from "../utils/appendParams"
import { HostedSession } from "./types"

/**
 * Function to retrieve hosted sessions.
 *
 * Example Usage:
 * ```typescript
 * const hostedSessions = await getHostedSessions({ session_type: "sessions" }) // Return all hosted sessions
 * or
 * const hostedSessions = await getHostedSessions({ package_id: 1, session_type: "combined_sessions" }) // Get hosted sessions for a specific package ID
 * ```
 *
 * Required Params:
 *  * @param {string} [session_type] - The type of session to retrieve.
 *   - `sessions`: Returns all sessions that can be joined as a driver, excluding spectator and non-league pending sessions for the user.
 *   - `combined_sessions`: Returns sessions that can be joined as a driver or spectator, including non-league pending sessions for the user.
 *
 * Optional Params:
 * @param {number} [package_id] - If set, returns only sessions using this car or track package ID (per the official API docs).
 */
export const getHostedSessions = async ({
  package_id,
  session_type,
}: {
  package_id?: number
  session_type: "sessions" | "combined_sessions"
}): Promise<HostedSession[] | undefined> => {
  if (!session_type) throw new Error("Cannot complete request. Missing required parameters. (session_type)")
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

  console.log(`Attempting to retrieve hosted sessions from ${URL}\n`)
  try {
    const { link } = await client.get(URL).then((response) => response.data)
    const data = await client.get(link).then((response) => response.data)
    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}
