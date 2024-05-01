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

  const authData = await fetchAuthCookie({ username: username, password: password })
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

  // const league = await getLeague({ league_id: 4170 })
  // league !== undefined ? console.log(league) : console.log("No league found")

  // const leaguePoints = await getLeaguePoints({ league_id: 4170, season_id: 50089 })
  // leaguePoints !== undefined ? console.log(leaguePoints) : console.log("No league points found")

  // const leagueMembership = await getLeagueMembership({ cust_id: 445755, include_league: true })
  // leagueMembership !== undefined ? console.log(leagueMembership) : console.log("No league membership found")

  // const leagueSeasons = await getLeagueSeasons({ league_id: 4170, retired: true })
  // leagueSeasons !== undefined ? console.log(leagueSeasons) : console.log("No league seasons found")

  // const leagueSeasonStandings = await getLeagueSeasonStandings({ league_id: 4170, season_id: 55337 })
  // leagueSeasonStandings !== undefined
  //   ? console.log(leagueSeasonStandings)
  // : console.log("No league season standings found")

  // const leagueSessions = await getLeagueSeasonSessions({ league_id: 4170, season_id: 55337 })
  // leagueSessions !== undefined ? console.log(leagueSessions) : console.log("No league season sessions found")

  // const clubs = await lookupClubHistory({ season_year: 2024, season_quarter: 1 })
  // clubs !== undefined ? console.log(clubs) : console.log("No club history found")

  // const countries = await lookupCountries()
  // countries !== undefined ? console.log(countries) : console.log("No countries found")

  // const drivers = await lookupDrivers({ cust_id: "Juan Saldana" })
  // drivers !== undefined ? console.log(drivers) : console.log("No drivers found")

  // const licenses = await lookupLicenses()
  // licenses !== undefined ? console.log(licenses) : console.log("No licenses found")

  // const memberAwards = await getMemberAwards({ cust_id: 82554 })
  // memberAwards !== undefined ? console.log(memberAwards) : console.log("No member awards found")

  // const memberChartData = await getMemberChartData({ cust_id: 82554, category_id: 1, chart_type: 1 })
  // memberChartData !== undefined ? console.log(memberChartData) : console.log("No member chart data found")

  // const member = await getMemberData({ cust_ids: "693109, 82554", included_licenses: true })
  // member !== undefined ? console.log(member) : console.log("No member found")

  // const personalInfo = await getAuthenticatedMemebrInfo()
  // personalInfo !== undefined ? console.log(personalInfo) : console.log("No personal info found")

  // const personalParticipationCredits = await getPersonalParticipationCredits()
  // personalParticipationCredits !== undefined
  //   ? console.log(personalParticipationCredits)
  //   : console.log("No participation credits found")

  // const memberProfile = await getMemberProfile({ cust_id: 12345 })
  // memberProfile !== undefined ? console.log(memberProfile) : console.log("No member profile found")

  // const teamProfile = await getTeamProfile({ team_id: 12345 })
  // teamProfile !== undefined ? console.log(teamProfile) : console.log("No team profile found")

  // const timeAttackData = await getUserTimeAttackData({ ta_comp_season_id: 4828 })
  // timeAttackData !== undefined ? console.log(timeAttackData) : console.log("No time attack data found")

  // const trackAssets = await getTrackAssets()
  // trackAssets !== undefined ? console.log(trackAssets) : console.log("No track assets found")

  // const subsessioResults = await getSubsessionResults({ subsession_id: 123456 })
  // subsessioResults !== undefined ? console.log(subsessioResults) : console.log("No subsession results found")

  // const subsessionEventLog = await getSubsessionEventLog({ subsession_id: 123456, simsession_number: 0 })
  // subsessionEventLog !== undefined ? console.log(subsessionEventLog) : console.log("No subsession event log found")

  // const lapChartData = await getSubsessionLapChartData({ subsession_id: 123456, simsession_number: 0 })
  // lapChartData !== undefined ? console.log(lapChartData) : console.log("No lap chart data found")

  // const lapData = await getSubsessionLapData({ subsession_id: 123456, simsession_number: 0, cust_id: 123456 })
  // lapData !== undefined ? console.log(lapData) : console.log("No lap data found")

  // const searchResults = await getSearchSeriesResults({
  //   season_year: 2024,
  //   season_quarter: 2,
  //   cust_id: 693109,
  // })
  // searchResults !== undefined ? console.log(searchResults) : console.log("No search results found")

  // const hostedSearchResults = await searchHostedSeriesResults({
  //   host_cust_id: 345352,
  //   start_range_begin: "2024-02-01T00:00:00Z",
  //   start_range_end: "2024-03-31T00:00:00Z",
  //   finish_range_begin: "2024-02-01T00:00:00Z",
  //   finish_range_end: "2024-03-31T00:00:00Z",
  // })
  // hostedSearchResults !== undefined ? console.log(hostedSearchResults) : console.log("No hosted search results found")

  // const seriesAssets = await getAllSeriesAsssets()
  // seriesAssets !== undefined ? console.log(seriesAssets) : console.log("No series assets found")

  // const pastSeasonData = await getPastSeasons(123)
  // pastSeasonData !== undefined ? console.log(pastSeasonData) : console.log("No past season data found")

  // const seriesSeasons = await getCurrentSeasonsSeries()
  // seriesSeasons !== undefined ? console.log(seriesSeasons) : console.log("No series seasons found")

  // const seriesStats = await getStatsSeries()
  // seriesStats !== undefined ? console.log(seriesStats) : console.log("No series stats found")

  // const memberBests = await getMemberBests()
  // memberBests !== undefined ? console.log(memberBests) : console.log("No member bests found")

  // const careerStats = await getMemberCareerStats()
  // careerStats !== undefined ? console.log(careerStats) : console.log("No member career stats found")

  // const divisionStats = await getMemberDivisionStats(4786, 5)
  // divisionStats !== undefined ? console.log(divisionStats) : console.log("No member division stats found")

  // const memberRecap = await getMemberRecap({})
  // memberRecap !== undefined ? console.log(memberRecap) : console.log("No member recap found")

  // const recentRaces = await getRecentRaces({ cust_id: 82554 })
  // recentRaces !== undefined ? console.log(recentRaces) : console

  //   const memberSummary = await getMemberSummary({ cust_id: 82554 })
  //   memberSummary !== undefined ? console.log(memberSummary) : console.log("No member summary found")

  // const memberYearlyStats = await getYearlyStats({ cust_id: 693109 })
  // memberYearlyStats !== undefined ? console.log(memberYearlyStats) : console.log("No member yearly stats found")

  // const seasonDriverStandings = await getSeasonDriverStandings({ season_id: 4603, car_class_id: 870 })
  // seasonDriverStandings !== undefined
  //   ? console.log(seasonDriverStandings)
  //   : console.log("No season driver standings found")

  // const supersessionStandings = await getSeasonSupersesssionStandings({ season_id: 4603, car_class_id: 870 })
  // supersessionStandings !== undefined
  //   ? console.log(supersessionStandings)
  //   : console.log("No season supersession standings found")

  // const seasonTeamStandings = await getSeasonTeamStandings({ season_id: 4603, car_class_id: 870 })
  // seasonTeamStandings !== undefined ? console.log(seasonTeamStandings) : console.log("No season team standings found")

  // const seasonTTstandings = await getSeasonTimetrialStandings({ season_id: 4603, car_class_id: 870 })
  // seasonTTstandings !== undefined ? console.log(seasonTTstandings) : console.log("No season timetrial standings found")

  // const timeTrialResults = await getSeasonTimetrialResults({ season_id: 4603, car_class_id: 870, race_week_num: 0 })
  // timeTrialResults !== undefined ? console.log(timeTrialResults) : console.log("No season timetrial results found")

  // const qualifyingResults = await getSeasonQualifyingResults({ season_id: 4603, car_class_id: 870, race_week_num: 0 })
  // qualifyingResults !== undefined ? console.log(qualifyingResults) : console.log("No season qualifying results found")

  // const worldRecords = await getWorldRecords({ car_id: 143, track_id: 97, season_year: 2024, season_quarter: 2 })
  // worldRecords !== undefined ? console.log(worldRecords) : console.log("No world records found")

  // const seasonList = await getSeasonList({ season_year: 2024, season_quarter: 2 })
  // seasonList !== undefined ? console.log(seasonList) : console.log("No season list found")
}

main()
