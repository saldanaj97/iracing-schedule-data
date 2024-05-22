## IRacingSDK

<p>Represents the iRacing SDK for interacting with the iRacing API.</p>

**Kind**: global class

- [IRacingSDK](#IRacingSDK)
- [.getCarAssets()](#getcarassets)
- [.getAllCars()](#getallcars)
- [.getCarClassData()](#getcarclassdata)
- [.getConstants()](#getconstants)
- [.getHostedSessions(session_type, package_id)](#gethostedsessionssession_type-package_id)
- [.getCustLeagueSessions(mine, package_id)](#getcustleaguesessionsmine-package_id)
- [.getLeagueDirectory()](#getleaguedirectory)
- [.getLeagueById(league_id, include_licenses)](#getleaguebyidleague_id-include_licenses)
- [.getLeaguePointSystem(league_id, season_id)](#getleaguepointsystemleague_id-season_id)
- [.getLeagueMemberships(cust_id, include_league)](#getleaguemembershipscust_id-include_league)
- [.getLeagueRoster(league_id, include_licenses)](#getleaguerosterleague_id-include_licenses)
- [.getLeagueSeasons(league_id, retired)](#getleagueseasonsleague_id-retired)
- [.getLeagueSeasonStandings(league_id, season_id, car_class_id, car_id)](#getleagueseasonstandingsleague_id-season_id-car_class_id-car_id)
- [.getLeagueSeasonSessions(league_id, season_id, results_only)](#getleagueseasonsessionsleague_id-season_id-results_only)
- [.lookupClubHistory(season_year, season_quarter)](#lookupclubhistoryseason_year-season_quarter)
- [.lookupCountries()](#lookupcountries)
- [.lookupDrivers(cust_id, league_id)](#lookupdriverscust_id-league_id)
- [.getMemberAwards(cust_id)](#getmemberawardscust_id)
- [.getMemberChartData(category_id, chart_type, cust_id)](#getmemberchartdatacategory_id-chart_type-cust_id)
- [.getMemberData(cust_ids, included_licenses)](#getmemberdatacust_ids-included_licenses)
- [.getPersonalInfo()](#getpersonalinfo)
- [.getPersonalParticipationCredits()](#getpersonalparticipationcredits)
- [.getMemberProfile(cust_id)](#getmemberprofilecust_id)
- [.getResults(subsession_id, included_licenses)](#getresultssubsession_id-included_licenses)
- [.getEventLog(subsession_id, simsession_number)](#geteventlogsubsession_id-simsession_number)
- [.getLapChartData(subsession_id, simsession_number)](#getlapchartdatasubsession_id-simsession_number)
- [.getLapData(subsession_id, simsession_number, cust_id, team_id)](#getlapdatasubsession_id-simsession_number-cust_id-team_id)
- [.getHostedSearchResults(cust_id, team_id, host_cust_id, session_name, start_range_begin, start_range_end, finish_range_begin, finish_range_end, league_id, league_session_id, car_id, track_id, category_ids)](#gethostedsearchresultscust_id-team_id-host_cust_id-session_name-start_range_begin-start_range_end-finish_range_begin-finish_range_end-league_id-league_session_id-car_id-track_id-category_ids)
- [.getSeriesSearchResults(season_year, season_quarter, cust_id, team_id, start_range_begin, start_range_end, finish_range_begin, finish_range_end, series_id, race_week_num, official_only, event_types, category_ids)](#getseriessearchresultsseason_year-season_quarter-cust_id-team_id-start_range_begin-start_range_end-finish_range_begin-finish_range_end-series_id-race_week_num-official_only-event_types-category_ids)
- [.getSeasonResults(season_id, event_type, race_week_num)](#getseasonresultsseason_id-event_type-race_week_num)
- [.getSeasonList(season_year, season_quarter)](#getseasonlistseason_year-season_quarter)
- [.getRaceGuide(from, include_end_after_from)](#getraceguidefrom-include_end_after_from)
- [.getSpectatorSubsessionIDs(event_types)](#getspectatorsubsessionidsevent_types)
- [.getAllSeriesAssets()](#getallseriesassets)
- [.getAllSeries()](#getallseries)
- [.getPastSeasons(series_id)](#getpastseasonsseries_id)
- [.getCurrentSeasonsSeries()](#getcurrentseasonsseries)
- [.getSeriesStats()](#getseriesstats)
- [.getMemberBests(member_id, car_id)](#getmemberbestsmember_id-car_id)
- [.getMemberCareerStats(member_id)](#getmembercareerstatsmember_id)
- [.getMemberDivisionStats(season_id, event_type)](#getmemberdivisionstatsseason_id-event_type)
- [.getMemberRecap(member_id, year, quarter)](#getmemberrecapmember_id-year-quarter)
- [.getRecentRaces(cust_id)](#getrecentracescust_id)
- [.getMemberSummary(cust_id)](#getmembersummarycust_id)
- [.getYearlyStats(cust_id)](#getyearlystatscust_id)
- [.getSeasonDriverStandings(season_id, car_class_id, club_id, division, race_week_num)](#getseasondriverstandingsseason_id-car_class_id-club_id-division-race_week_num)
- [.getSeasonSupersessionStandings(season_id, car_class_id, club_id, division, race_week_num)](#getseasonsupersessionstandingsseason_id-car_class_id-club_id-division-race_week_num)
- [.getSeasonTeamStandings(season_id, car_class_id, race_week_num)](#getseasonteamstandingsseason_id-car_class_id-race_week_num)
- [.getSeasonTimeTrialStandings(season_id, car_class_id, club_id, division, race_week_num)](#getseasontimetrialstandingsseason_id-car_class_id-club_id-division-race_week_num)
- [.getSeasonTimeTrialResults(season_id, car_class_id, race_week_num, club_id, division)](#getseasontimetrialresultsseason_id-car_class_id-race_week_num-club_id-division)
- [.getSeasonQualifyingResults(season_id, car_class_id, race_week_num, club_id, division)](#getseasonqualifyingresultsseason_id-car_class_id-race_week_num-club_id-division)
- [.getWorldRecords(car_id, track_id, season_year, season_quarter)](#getworldrecordscar_id-track_id-season_year-season_quarter)
- [.getTeamProfile(team_id, include_licenses)](#getteamprofileteam_id-include_licenses)
- [.getUserTimeAttackData(ta_comp_season_id)](#getusertimeattackdatata_comp_season_id)
- [.getTrackData()](#gettrackdata)
- [.getTrackAssets()](#gettrackassets)

### getCarAssets()

<p>Function that will grab the assets of the cars on the service.</p>
<p>NOTE: Image paths are relative to https://images-static.iracing.com/ so you will need to append the links for the data you want to the URL</p>

### getAllCars()

<p>Function that will fetch each car available on the service</p>

### getCarClassData()

<p>Function that will grab car class data.</p>

### getConstants()

<p>Function that will grab all the constants available on the API</p>

<b>Required Params:</b>

| Param    | Description                                                                                                                        |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| constant | <p>The type of session to retrieve. Will be one of the following: <ui><li>categories</li> <li>divisons</li> <li>event_types</li><> |

### getHostedSessions(session_type, package_id)

<p>Function to retrieve hosted sessions.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>const hostedSessions = await iRacingSDK.getHostedSessions(session_type: &quot;sessions&quot;) // Return all hosted sessions
or
const hostedSessions = await iRacingSDK.getHostedSessions(session_type: &quot;combined_sessions&quot;, package_id: 1) // Get hosted sessions for a specific package ID
</code></pre>

<b>Required Params:</b>

| Param        | Type                | Description                                                                                                                                                                                                                                                                                                                                                          |
| ------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| session_type | <code>string</code> | <p>The type of session to retrieve.</p> <ul> <li><code>sessions</code>: Returns all sessions that can be joined as a driver, excluding spectator and non-league pending sessions for the user.</li> <li><code>combined_sessions</code>: Returns sessions that can be joined as a driver or spectator, including non-league pending sessions for the user.</li> </ul> |

<b>Optional Params:</b>

| Param      | Type                | Description                                                                                                                                                                    |
| ---------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| package_id | <code>number</code> | <p>Can only be used with &quot;combined_sessions&quot; for the session type. If set, returns only sessions using this car or track package ID (per the official API docs).</p> |

### getCustLeagueSessions(mine, package_id)

<p>Function to retrieve hosted sessions.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
const sessions = iRacingSDK.getCustLeagueSessions({ mine: true }) // Returns only sessions created by the user
or
const sessions = iRacingSDK.getCustLeagueSessions({ }) // Returns all league sessions
</code></pre>

<b>Optional Params:</b>

| Param      | Type                 | Description                                                                                          |
| ---------- | -------------------- | ---------------------------------------------------------------------------------------------------- |
| mine       | <code>boolean</code> | <p>If true, returns only sessions created by the user.</p>                                           |
| package_id | <code>number</code>  | <p>If set, returns only sessions using this car or track package ID (per the official API docs).</p> |

### getLeagueDirectory()

<p>Retrieve league directory info containing provided parameters.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getLeagueDirectory({})  // Returns all leagues
or
iRacingSDK.getLeagueDirectory({ search: &quot;NASCAR&quot;}) // Returns all leagues with &quot;NASCAR&quot; in the name, description, owner, or league ID.
</code></pre>

<b>Optional Params:</b>

| Param                  | Type                 | Description                                                         |
| ---------------------- | -------------------- | ------------------------------------------------------------------- |
| search                 | <code>number</code>  | Will search against league name, description, owner, and league ID. |
| tag                    | <code>boolean</code> | One or more tags, comma-separated                                   |
| restrict_to_member     | <code>boolean</code> | If true include only leagues for which customer is a member.        |
| restrict_to_recruiting | <code>boolean</code> | If true include only leagues which are recruiting.                  |
| restrict_to_friends    | <code>boolean</code> | If true include only leagues owned by a friend.                     |
| restrict_to_watched    | <code>boolean</code> | If true include only leagues owned by a watched member.             |
| minimum_roster_count   | <code>number</code>  | If set include leagues with at least this number of members         |
| maximum_roster_count   | <code>number</code>  | If set include leagues with no more than this number of members.    |
| lowerbound             | <code>number</code>  | First row of results to return. Defaults to 1.                      |
| upperbound             | <code>number</code>  | Last row of results to results to lowerbound + 39.                  |

### getLeagueById(league_id, include_licenses)

<p>Retrieve a specific league by league ID.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>iRacingSDK.getSpecificLeague({ league_id: 12345 }) // Returns the league with the ID of 12345
</code></pre>

<b>Required Params:</b>

| Param     | Type                | Description                                                               |
| --------- | ------------------- | ------------------------------------------------------------------------- |
| league_id | <code>number</code> | <p>The ID of the league you want to retrieve.</p> <b>Optional Params:</b> |

<b>Optional Params:</b>

| Param            | Type                 | Description                                                                                |
| ---------------- | -------------------- | ------------------------------------------------------------------------------------------ |
| include_licenses | <code>boolean</code> | <p>For faster responses, only request when necessary. Return licenses for each member.</p> |

### getLeaguePointSystem(league_id, season_id)

<p>Retrieve a specific league by league ID.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getLeaguePointSystem({ league_id: 12345 }) // Returns the league with the ID of 12345
or 
iRacingSDK.getLeaguePointSystem({ league_id: 12345, season_id: 12345 }) // Returns the league with the ID of 12345 and the season with the ID of 12345
</code></pre>

<b>Required Params:</b>

| Param     | Type                | Description                                                               |
| --------- | ------------------- | ------------------------------------------------------------------------- |
| league_id | <code>number</code> | <p>The ID of the league you want to retrieve.</p> <b>Optional Params:</b> |

<b>Optional Params:</b>

| Param     | Type                | Description                                                                                                                                                                                       |
| --------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| season_id | <code>number</code> | <p>If included and the season is using custom points (points_system_id:2) then the custom points option is included in the returned list. Otherwise the custom points option is not returned.</p> |

### getLeagueMemberships(cust_id, include_league)

<p>Retrieve a list of leagues the user owns (if league is not set to private).</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getLeagueMemberships({ cust_id: 12345, include_league: true }) // Returns the leagues customer 12345 if the owner of if not set to private
</code></pre>

<b>Required Params:</b>

| Param   | Type                | Description                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cust_id | <code>number</code> | <p>If different from the authenticated member, the following resrictions apply:</p> <ul> <li>Caller cannot be on requested customer's block list or an empty list will result;</li> <li>Requested customer cannot have their online activity prefrence set to hidden or an empty list will result;</li> <li>Only leagues for which the requested customer is an admin and the league roster is not private are returned</li> </ul> |

<b>Optional Params:</b>

| Param          | Type                 | Description                                                      |
| -------------- | -------------------- | ---------------------------------------------------------------- |
| include_league | <code>boolean</code> | <p>If true, includes the league information in the response.</p> |

### getLeagueRoster(league_id, include_licenses)

<p>Retrieve a leagues roster list.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getLeagueRoster({ league_id: 12345 }) // Returns the roster for the league with the ID of 12345
</code></pre>

<b>Required Params:</b>

| Param     | Type                | Description                                                      |
| --------- | ------------------- | ---------------------------------------------------------------- |
| league_id | <code>number</code> | <p>The ID of the league you want to retrieve the roster for.</p> |

<b>Optional Params:</b>

| Param            | Type                 | Description                                               |
| ---------------- | -------------------- | --------------------------------------------------------- |
| include_licenses | <code>boolean</code> | <p>For faster responses, only request when necessary.</p> |

### getLeagueSeasons(league_id, retired)

<p>Retrieve the past and current seasons for a specific league.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getLeagueSeasons({ league_id: 12345 }) // Returns the seasons for the league with the ID of 12345
</code></pre>

<b>Required Params:</b>

| Param     | Type                | Description                                                |
| --------- | ------------------- | ---------------------------------------------------------- |
| league_id | <code>number</code> | The ID of the league you want to retrieve the seasons for. |

<b>Optional Params:</b>

| Param   | Type                 | Description                       |
| ------- | -------------------- | --------------------------------- |
| retired | <code>boolean</code> | If true, include retired seasons. |

### getLeagueSeasonStandings(league_id, season_id, car_class_id, car_id)

<p>Retrieve the standings for a specific league and season.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getLeagueSeasonStandings({ league_id: 12345 }) // Returns the sessions for the league with the ID of 12345
</code></pre>

<b>Required Params:</b>

| Param     | Type                | Description                                                        |
| --------- | ------------------- | ------------------------------------------------------------------ |
| league_id | <code>number</code> | <p>The ID of the league you want to retrieve the sessions for.</p> |
| season_id | <code>number</code> | <p>The ID of the season you want to retrieve the sessions for.</p> |

<b>Optional Params:</b>

| Param        | Type                | Description                                                                                                                                 |
| ------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| car_class_id | <code>number</code> | <p>The ID of the car class</p>                                                                                                              |
| car_id       | <code>number</code> | <p>If car_class_id is included then the standings are for the car in that car class, otherwise they are for the car across car classes.</p> |

### getLeagueSeasonSessions(league_id, season_id, results_only)

<p>Retrieve each session in a season for a specific league.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getLeagueSeasonSessions({ league_id: 12345, season_id: 12345 }) // Returns the sessions for the league with the ID of 12345
</code></pre>

<b>Required Params:</b>

| Param     | Type                | Description                                                 |
| --------- | ------------------- | ----------------------------------------------------------- |
| league_id | <code>number</code> | The ID of the league you want to retrieve the sessions for. |
| season_id | <code>number</code> | The ID of the season you want to retrieve the sessions for. |

<b>Required Params:</b>

| Param        | Type                 | Description                                                     |
| ------------ | -------------------- | --------------------------------------------------------------- |
| results_only | <code>boolean</code> | If true, include only sessions for which results are available. |

### lookupClubHistory(season_year:, season_quarter:)

<p>Return the different clubs available on the service. Returns an earlier history if requirested quarter does not have a club history.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.lookupClubHistory({ season_year: 2021, season_quarter: 1 }) // Returns club history for 2021S1
</code></pre>

<b>Required Params:</b>

| Param           | Description                                   |
| --------------- | --------------------------------------------- |
| season_year:    | The year of the season you want to look up    |
| season_quarter: | The quarter of the season you want to look up |

### lookupCountries()

<p>Return the countries and their codes available on the service.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.lookupCountries() // Returns all countries and their codes
</code></pre>

### lookupDrivers(cust_id, league_id)

<p>Return the driver on the service with the given customer_id (search_term).</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.lookupDrivers({search_term: 123456})
or
iRacingSDK.lookupDrivers({search_term: &quot;Richard Bobby&quot;})
</code></pre>

<b>Required Params:</b>

| Param   | Description                                        |
| ------- | -------------------------------------------------- |
| cust_id | The customer_id of the driver you want to look up. |

<b>Optional Params:</b>

| Param     | Description                                                                                   |
| --------- | --------------------------------------------------------------------------------------------- |
| league_id | ID of the league you want to search in. Narrows the search to the roster of the given league. |

### getMemberAwards(cust_id:)

<p>Return a list of awards for a specific member. If no cust_id is provided, the function will return the awards for the authenticated user.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getMemberAwards({ cust_id: 12345 })
</code></pre>

<b>Optional Params:</b>

| Param    | Description                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------------------- |
| cust_id: | The member ID of the user to retrieve awards for. If none is provided, data will be grabbed for the authenticated member. |

### getMemberChartData(category_id, chart_type, cust_id)

<p>Retrieve the chart data for a member. If no cust_is is provided, the function will return the chart data for the authenticated user.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getMemberChartData({ cust_id: 12345, category_id: 1, chart_type: '1' })
</code></pre>

<b>Required Params:</b>

| Param       | Description                                                                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| category_id | <p>The category ID of the chart data to retrieve. <ul><li>1 - Oval</li><li> 2 - Road</li><li>3 - Dirt oval</li><li>4 - Dirt road</li></ul></p> |
| chart_type  | <p>The type of chart data to retrieve. <ul><li>1 - iRating</li><li>2 - TT Rating</li><li>3 - License/SR</li></ul> </p>                         |

<b>Optional Params:</b>

| Param   | Description                                           |
| ------- | ----------------------------------------------------- |
| cust_id | The member ID of the user to retrieve chart data for. |

### getMemberData(cust_ids, included_licenses)

<p>Retrieve the club data for a member. If no cust_id is provided, the function will return the club data for the authenticated user.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getMemberData({ cust_ids: &quot;693109, 82554&quot; }) // Returns club data for the specified members
</code></pre>

<b>Required Params:</b>

| Param     | Description                                                                                                                                  |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| cust_ids: | The member ID of the user to retrieve club data for. (ie. &quot;123456, 12345&quot; for multiple ids, or &quot;123456&quot; for a single id) |

<b>Optional Params:</b>

| Param              | Description                                                                |
| ------------------ | -------------------------------------------------------------------------- |
| included_licenses: | Whether or not to include license data in the response. Defaults to false. |

### getPersonalInfo()

<p>Retrieve personal info.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getPersonalInfo()
</code></pre>

### getPersonalParticipationCredits()

<p>Retrieve personal participation credit data. Participation credits are rewarded for participating in certain licensed series and are awarded at the end
of each season.
Example Usage:</p>
<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getPersonalParticipationCredits()
</code></pre>

### getMemberProfile(cust_id)

<p>Retrieve the specific member's profile. If no cust_id is provided, defaults to the authenticated user.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getMemberProfile({cust_id: 12345}) // Returns the profile for the specified member
</code></pre>

<b>Optional Params:</b>

| Param    | Description                                                                                   |
| -------- | --------------------------------------------------------------------------------------------- |
| cust_id: | The member ID of the user to retrieve profile data for. Defaults to the authenticated member. |

### getResults(subsession_id, included_licenses)

<p>Get the results of a subsession, if authorized to view them. series_logo image paths are relative to https://images-static.iracing.com/img/logos/series/</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getResults({subsession_id: 12345, included_licenses: true}) // Returns the results of the subsession.
</code></pre>

<b>Required Params:</b>

| Param         | Description                                  |
| ------------- | -------------------------------------------- |
| subsession_id | The ID of the subsession to get results for. |

<b>Optional Params:</b>

| Param             | Description                                             |
| ----------------- | ------------------------------------------------------- |
| included_licenses | Whether or not to include license data in the response. |

### getEventLog(subsession_id, simsession_number)

<p>Get the event log of the provided subsession.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getEventLog({subsession_id: 12345, simsession_number: 0}) // Returns the event log for the subsession.
</code></pre>

<b>Required Params:</b>

| Param             | Description                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| subsession_id     | The ID of the subsession to get the event log for.                                                         |
| simsession_number | The simsession number to get the event log for. The main event is 0; the preceding event is -1, and so on. |

### getLapChartData(subsession_id, simsession_number)

<p>Get the lap chart data for the provided subsession.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getLapChartData({subsession_id: 12345, simsession_number: 0}) // Returns the lap chart data
</code></pre>

<b>Required Params:</b>

| Param             | Description                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| subsession_id     | The ID of the subsession to get the event log for.                                                         |
| simsession_number | The simsession number to get the event log for. The main event is 0; the preceding event is -1, and so on. |

### getLapData(subsession_id, simsession_number, cust_id, team_id)

<p>Get the lap data for the provided subsession.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>iRacingSDK.getLapData({subsession_id: 12345, simsession_number: 0, cust_id: 123456}) // Returns the lap chart data
</code></pre>

<b>Required Params:</b>

| Param             | Description                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| subsession_id     | The ID of the subsession to get the event log for.                                                         |
| simsession_number | The simsession number to get the event log for. The main event is 0; the preceding event is -1, and so on. |

<b>Optional Params:</b>

| Param   | Description                                                                                                                                                                                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| cust_id | Required if the subsession was a single-driver event. Optional for team events. Required if the subsession was a single-driver event. Optional for team events. If omitted for a team event then the laps driven by all the team's drivers will be included. |
| team_id | Required if subsession was a team event                                                                                                                                                                                                                      |

### getHostedSearchResults(cust_id, team_id, host_cust_id, session_name, start_range_begin, start_range_end, finish_range_begin, finish_range_end, league_id, league_session_id, car_id, track_id, category_ids)

<p>Hosted session search results. One of the primary filters needs to be included. Primary filters include host, driver, team, or session name.</p>
<p>Maximum time frame of 90 days. Results split into one or more files with chunks of results.</p>
<p>For scraping results the most effective approach is to keep track of the maximum end_time found during
a search then make the subsequent call using that date/time as the finish_range_begin and skip any subsessions that are duplicated.
Results are ordered by subsessionid which is a proxy for start time. </p>

<p>Requires one of: <ul><li>start_range_begin</li> <li>finish_range_begin</li></ul> </p>
<p>and one of: <ul><li>cust_id</li> <li>team_id</li> <li>host_cust_id</li> <li>session_name</li> </ul></p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>// Returns hosted session data for the host with customer ID 345352.
iRacingSDK.getHostedSearchResults({
   host_cust_id: 345352,
   start_range_begin: &quot;2024-03-31T00:00:00Z&quot;,
   start_range_end: &quot;2024-04-01T00:00:00Z&quot;,
   finish_range_begin: &quot;2024-03-31T00:00:00Z&quot;,
   finish_range_end: &quot;2024-04-01T00:00:00Z&quot;,
})
</code></pre>

<p>Required Params (One of the following is required):</p>

| Param              | Description                                                                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| cust_id            | Include only sessions in which this customer participated. Ignored if team_id is supplied.                                                      |
| team_id            | Include only sessions in which this team participated. Takes priority over cust_id if both are supplied.                                        |
| host_cust_id       | The host's customer ID.                                                                                                                         |
| session_name       | Part or all of the session's name.</p> <>Optional Params:                                                                                       |
| start_range_begin  | Session start times. ISO-8601 UTC time zero offset: &quot;2022-04-01T15:45Z&quot;.                                                              |
| start_range_end    | ISO-8601 UTC time zero offset: &quot;2022-04-01T15:45Z&quot;. Exclusive. May be omitted if start_range_begin is less than 90 days in the past.  |
| finish_range_begin | Session finish times. ISO-8601 UTC time zero offset: &quot;2022-04-01T15:45Z&quot;.                                                             |
| finish_range_end   | ISO-8601 UTC time zero offset: &quot;2022-04-01T15:45Z&quot;. Exclusive. May be omitted if finish_range_begin is less than 90 days in the past. |
| league_id          | Include only sessions for this league.                                                                                                          |
| league_session_id  | Include only sessions for the league session with this ID.                                                                                      |
| car_id             | One of the cars used by the session.                                                                                                            |
| track_id           | The ID of the track used by the session.                                                                                                        |
| category_ids       | License categories to include in the search. Defaults to all. (ex. ?category_ids=1,2,3,4)                                                       |

### getSeriesSearchResults(season_year, season_quarter, cust_id, team_id, start_range_begin, start_range_end, finish_range_begin, finish_range_end, series_id, race_week_num, official_only, event_types, category_ids)

<p>Official series search.  Maximum time frame of 90 days. Results split into one or more files with chunks of results.</p>
<p>This request can take a bit of time to process and return the link to the results. A recommendation would be to make the URL yourself, and then use the link to get the data to verify
that the data is what you are looking for.</p>
<p>For scraping results, the most effective approach is to keep track of the maximum end_time found during a
search then make the subsequent call using that date/time as the finish_range_begin and skip any subsessions that are duplicated.  Results are ordered by
subsessionid which is a proxy for start time but groups together multiple splits of a series when multiple series launch sessions at the same time.
Requires at least one of: season_year and season_quarter, start_range_begin, finish_range_begin.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>// Returns all session data for customer 123456 in the 2024 season 2nd quarter.
iRacingSDK.getSeriesSearchResults({season_year: 2024, season_quarter: 2, cust_id: 123456})
</code></pre>

<b>Required Params:</b>

| Param              | Description                                                                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| season_year        | The year of the season to get the event log for. Required only when using season_quarter.                                                       |
| season_quarter     | The quarter of the year to get the event log for. Required only when using season_yea                                                           |
| cust_id            | Include only sessions in which this customer participated. Ignored if team_id is supplied.                                                      |
| team_id            | Include only sessions in which this team participated. Takes priority over cust_id if both are supplied.                                        |
| start_range_begin  | Session start times. ISO-8601 UTC time zero offset: &quot;2022-04-01T15:45Z&quot;.                                                              |
| start_range_end    | ISO-8601 UTC time zero offset: &quot;2022-04-01T15:45Z&quot;. Exclusive. May be omitted if start_range_begin is less than 90 days in the past.  |
| finish_range_begin | Session finish times. ISO-8601 UTC time zero offset: &quot;2022-04-01T15:45Z&quot;.                                                             |
| finish_range_end   | ISO-8601 UTC time zero offset: &quot;2022-04-01T15:45Z&quot;. Exclusive. May be omitted if finish_range_begin is less than 90 days in the past. |
| series_id          | Include only sessions for series with this ID.                                                                                                  |
| race_week_num      | Include only sessions with this race week number.                                                                                               |
| official_only      | If true, include only sessions earning championship points. Defaults to all.                                                                    |
| event_types        | Types of events to include in the search. Defaults to all. (ex. ?event_types=2,3,4,5)                                                           |
| category_ids       | License categories to include in the search. Defaults to all. (ex. ?category_ids=1,2,3,4)                                                       |

### getSeasonResults(season_id, event_type, race_week_num)

<p>Get all results for a season.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>iRacingSDK.getSeasonResults({season_id: 4753, event_type: 5, race_week_num: 0}) // Returns the lap chart data
</code></pre>

<b>Required Params:</b>

| Param     | Description                                  |
| --------- | -------------------------------------------- |
| season_id | The ID of the season to get the results for. |

<b>Optional Params:</b>

| Param         | Description                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| event_type    | <p>Restrict to one event type: <ul><li>2 - Practice</li> <li>3 - Qualify</li> <li>4 - Time Trial</li> <li> 5 - Race</li></ul></p> |
| race_week_num | Zero based so the first race week of the season is 0.                                                                             |

### getSeasonList(season_year, season_quarter)

<p>Retrieve the list of seasons for a specific year and quarter.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.const seasonList = await getSeasonList({ season_year: 2024, season_quarter: 1 });
</code></pre>

<p>Required Parameters:</p>

| Param          | Description                |
| -------------- | -------------------------- |
| season_year    | The year of the season.    |
| season_quarter | The quarter of the season. |

### getRaceGuide(from, include_end_after_from)

<p>Retrieve the race guide for a specific date.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
const raceGuideData = await iRacingSDK.getRaceGuide({from: &quot;2024-05-10T16:30:00Z&quot;, include_end_after_from: true });
</code></pre>
<p>Optional Parameters:</p>

| Param                  | Description                                                                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from                   | ISO-8601 offset format. Defaults to the current time. Include sessions with start times up to 3 hours after this time. Times in the past will be rewritten to the current time. |
| include_end_after_from | Include sessions which start before 'from' but end after.                                                                                                                       |

### getSpectatorSubsessionIDs(event_types)

<p>Retrieve the spectator subsession IDs for specific event types.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
const spectatorSubsessionIDs = await iRacingSDK.getSpectatorSubessionIDs({ event_types: [1, 2, 3] });
</code></pre>

<p>Required Parameters:</p>

| Param       | Description                                                             |
| ----------- | ----------------------------------------------------------------------- |
| event_types | An array of event types for which to retrieve spectator subsession IDs. |

### getAllSeriesAssets()

<p>Return all the assets tied to the series.</p>

<p>Image paths are relative to https://images-static.iracing.com/</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
const seriesAssets = await iRacingSDK.getAllSeriesAsssets()
</code></pre>

### getAllSeries()

<p>Retrieve the general series data for all series in a season.</p>

<p>This includes basic data such as (not exhaustive):</p>

<ul>
  <li>Category</li>
  <li>Series ID</li>
  <li>Series Name</li>
  <li>Series Short Name</li>
</ul>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
const series = await iRacingSDK.getAllSeries() // Return generalized series data
</code></pre>

### getPastSeasons(series_id)

<p>Get all seasons for a series. Filter list by official:true for seasons with standings.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
const pastSeasonData = await iRacingSDK.getPastSeasons(123) // Return past season data for series ID 123
</code></pre>

<p>Required Parameters:</p>

| Param     | Description                           |
| --------- | ------------------------------------- |
| series_id | The series ID to get the seasons for. |

### getCurrentSeasonsSeries()

<p>This function returns more detailed data about each series such as schedule, car classes, and track data.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
const seriesData = await iRacingSDK.getCurrentSeasonsSeries() // Return detailed data for each series in the current season
</code></pre>

### getSeriesStats()

<p>Get all the series offered by iRacing whether active or inactive.</p>
<p>To get series and seasons for which standings should be available, filter the list by official: true.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
const schedule = await iRacingSDK.getSeriesStats() // Return a list of series with stats
</code></pre>

### getMemberBests(member_id, car_id)

<p>Retrieve member bests stats.</p>

<p>If you want to retrieve stats for a specific car, first call should exclude car_id;
use cars_driven list in return for subsequent calls.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
const memberStats = await iRacingSDK.getMemberBests() // Return member best lap times
</code></pre>

<b>Optional Params:</b>

| Param     | Description                                                                            |
| --------- | -------------------------------------------------------------------------------------- |
| member_id | Defaults to the authenticated member                                                   |
| car_id    | First call should exclude car_id; use cars_driven list in return for subsequent calls. |

### getMemberCareerStats(member_id)

<p>Retrieve members career stats. Defaults ot the authenticated member but member_id can be passed to retrieve stats for another member.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
const memberStats = await iRacingSDK.getMemberCareerStats() // Return member career stats
</code></pre>

<b>Optional Params:</b>

| Param     | Description                          |
| --------- | ------------------------------------ |
| member_id | Defaults to the authenticated member |

### getMemberDivisionStats(season_id, event_type)

<p>Retrieve member division. Divisions are 0-based: 0 is Division 1, 10 is Rookie. See /data/constants/divisons for more information. Always for the authenticated member.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
const memberDivisonStats = await iRacingSDK.getMemberDivisionStats() // Return member division stats
</code></pre>

<b>Required Params:</b>

| Param      | Description                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| season_id  | ID of the season you want data for                                                                    |
| event_type | <p>The event type code for the division type: <ul><li>4 - Time Trial</li> <li>5 - Race</li> </ul></p> |

### getMemberRecap(member_id, year, quarter)

<p>Retrieve member recap. Defaults to the authenticated member, but member_id can be passed to retrieve stats for another member.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
const memberRecap = await iRacingSDK.getMemberRecap() // Return member recap stats
</code></pre>

<b>Optional Params:</b>

| Param     | Description                                                                               |
| --------- | ----------------------------------------------------------------------------------------- |
| member_id | Defaults to the authenticated member                                                      |
| year      | Season year; if not supplied the current calendar year (UTC) is used.                     |
| quarter   | Season (quarter) within the year; if not supplied the recap will be fore the entire year. |

### getRecentRaces(cust_id)

<p>Retrieve a members recent races. Defaults to the authenticated member, but member_id can be passed to retrieve stats for another member.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
const recentRaces = await iRacingSDK.getRecentRaces({cust_id: 123456}) // Return recent races for member 123456
</code></pre>

<b>Optional Params:</b>

| Param   | Description                          |
| ------- | ------------------------------------ |
| cust_id | Defaults to the authenticated member |

### getMemberSummary(cust_id)

<p>Retrieve member summary. Defaults to the authenticated member, but member_id can be passed to retrieve stats for another member.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
const memberSummary = await iRacingSDK.getMemberSummary({cust_id: 123456}) // Return member summary for member 123456
</code></pre>

<b>Optional Params:</b>

| Param   | Description                          |
| ------- | ------------------------------------ |
| cust_id | Defaults to the authenticated member |

### getYearlyStats(cust_id)

<p>Retrieve member summary. Defaults to the authenticated member, but member_id can be passed to retrieve stats for another member.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
const memberSummary = await iRacingSDK.getMemberSummary({cust_id: 123456}) // Return member summary for member 123456
</code></pre>

<b>Optional Params:</b>

| Param   | Description                          |
| ------- | ------------------------------------ |
| cust_id | Defaults to the authenticated member |

### getSeasonDriverStandings(season_id, car_class_id, club_id, division, race_week_num)

<p>Retrieve season driver standings. A base_download_url will be returned along with a list of chunk file names, which can be used to download the data. Simply
attach the chunk file name to the base_download_url to download the file.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
// Return season driver standings for season 1234 and car class 1234
const seasonDriverStandings = await iRacingSDK.getSeasonDriverStandings({season_id: 4603, car_class_id: 870})
</code></pre>

<b>Required Params:</b>

| Param        | Description                           |
| ------------ | ------------------------------------- |
| season_id    | ID of the season you want data for    |
| car_class_id | ID of the car class you want data for |
|              |

<b>Optional Params:</b>

| Param         | Description                                                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| club_id       | ID of the club you want data for. Defaults to all (-1).                                                                                               |
| division      | Division you want data for. Divisions are 0-based: 0 is Division 1, 10 is Rookie. See /data/constants/divisons for more information. Defaults to all. |
| race_week_num | Number of the race week. The first race week of a season is 0.                                                                                        |

### getSeasonSupersessionStandings(season_id, car_class_id, club_id, division, race_week_num)

<p>Retrieve seasons supersession standings. A base_download_url will be returned along with a list of chunk file names, which can be used to download the data. Simply
attach the chunk file name to the base_download_url to download the file.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
// Return season driver standings for season 1234 and car class 1234
const supersessionStandings = await iRacingSDK.getSeasonSupersesssionStandings({season_id: 1234, car_class_id: 1234})
</code></pre>

<b>Required Params:</b>

| Param        | Description                           |
| ------------ | ------------------------------------- |
| season_id    | ID of the season you want data for    |
| car_class_id | ID of the car class you want data for |

<b>Optional Params:</b>

| Param         | Description                                                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| club_id       | ID of the club you want data for. Defaults to all (-1).                                                                                               |
| division      | Division you want data for. Divisions are 0-based: 0 is Division 1, 10 is Rookie. See /data/constants/divisons for more information. Defaults to all. |
| race_week_num | Number of the race week. The first race week of a season is 0.                                                                                        |

### getSeasonTeamStandings(season_id, car_class_id, race_week_num)

<p>Retrieve season team standings. A base_download_url will be returned along with a list of chunk file names, which can be used to download the data. Simply
attach the chunk file name to the base_download_url to download the file.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
const seasonTeamStandings = await iRacingSDK.getSeasonTeamStandings({season_id: 1234, car_class_id: 123}) // Return team standings for season 1234 and car class 123
</code></pre>

<b>Required Params:</b>

| Param        | Description                           |
| ------------ | ------------------------------------- |
| season_id    | ID of the season you want data for    |
| car_class_id | ID of the car class you want data for |

<b>Optional Params:</b>

| Param         | Description                                                    |
| ------------- | -------------------------------------------------------------- |
| race_week_num | Number of the race week. The first race week of a season is 0. |

### getSeasonTimeTrialStandings(season_id, car_class_id, club_id, division, race_week_num)

<p>Retrieve season time trial standings. A base_download_url will be returned along with a list of chunk file names, which can be used to download the data. Simply
attach the chunk file name to the base_download_url to download the file.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
// Return season time trial season standings for season 4603 and car class 870
const timeTrialStandings = await iRacingSDK.getSeasonTimetrialStandings({season_id: 4603, car_class_id: 870 })
</code></pre>

<b>Required Params:</b>

| Param        | Description                           |
| ------------ | ------------------------------------- |
| season_id    | ID of the season you want data for    |
| car_class_id | ID of the car class you want data for |

<b>Optional Params:</b>

| Param         | Description                                                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| club_id       | ID of the club you want data for. Defaults to all (-1).                                                                                               |
| division      | Division you want data for. Divisions are 0-based: 0 is Division 1, 10 is Rookie. See /data/constants/divisons for more information. Defaults to all. |
| race_week_num | Number of the race week. The first race week of a season is 0.                                                                                        |

### getSeasonTimeTrialResults(season_id, car_class_id, race_week_num, club_id, division)

<p>Retrieve season time trial results. A base_download_url will be returned along with a list of chunk file names, which can be used to download the data. Simply
attach the chunk file name to the base_download_url to download the file.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
// Return time trials results for season 4603, car class 870, and race week 0
const timetrialResults = await iRacingSDK.getSeasonTimetrialResults({season_id: 4603, car_class_id: 870, race_week_num: 0 })
</code></pre>

<b>Required Params:</b>

| Param         | Description                                                    |
| ------------- | -------------------------------------------------------------- |
| season_id     | ID of the season you want data for                             |
| car_class_id  | ID of the car class you want data for                          |
| race_week_num | Number of the race week. The first race week of a season is 0. |

<b>Optional Params:</b>

| Param    | Description                                                                                                                                           |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| club_id  | ID of the club you want data for. Defaults to all (-1).                                                                                               |
| division | Division you want data for. Divisions are 0-based: 0 is Division 1, 10 is Rookie. See /data/constants/divisons for more information. Defaults to all. |

### getSeasonQualifyingResults(season_id, car_class_id, race_week_num, club_id, division)

<p>Retrieve season qualifying results. A base_download_url will be returned along with a list of chunk file names, which can be used to download the data. Simply
attach the chunk file name to the base_download_url to download the file.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
// Return time trials results for season 4603, car class 870, and race week 0
const qualfyingResults = await iRacingSDK.getSeasonQualifyingResults({season_id: 4603, car_class_id: 870, race_week_num: 0 })
</code></pre>

<b>Required Params:</b>

| Param         | Description                                                    |
| ------------- | -------------------------------------------------------------- |
| season_id     | ID of the season you want data for                             |
| car_class_id  | ID of the car class you want data for                          |
| race_week_num | Number of the race week. The first race week of a season is 0. |

<b>Optional Params:</b>

| Param    | Description                                                                                                                                           |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| club_id  | ID of the club you want data for. Defaults to all (-1).                                                                                               |
| division | Division you want data for. Divisions are 0-based: 0 is Division 1, 10 is Rookie. See /data/constants/divisons for more information. Defaults to all. |

### getWorldRecords(car_id, track_id, season_year, season_quarter)

<p>Retrieve world records. A base_download_url will be returned along with a list of chunk file names, which can be used to download the data. Simply
attach the chunk file name to the base_download_url to download the file.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
// Return time trials results for season 4603, car class 870, and race week 0
const timetrialResults = await iRacingSDK.getSeasonTimetrialResults({season_id: 4603, car_class_id: 870, race_week_num: 0 })
</code></pre>

<b>Required Params:</b>

| Param    | Description                                  |
| -------- | -------------------------------------------- |
| car_id   | ID of the car you want world record data for |
| track_id | ID of the track you want data for            |

<b>Optional Params:</b>

| Param          | Description                                                            |
| -------------- | ---------------------------------------------------------------------- |
| season_year    | Limit best time to a given year                                        |
| season_quarter | Limit best times to a given quarter; only applicable when year is used |

### getTeamProfile(team_id, include_licenses)

<p>Function to retrieve a team's profile.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getTeamProfile({team_id: 12345})
</code></pre>

<b>Required Params:</b>

| Param   | Description                                           |
| ------- | ----------------------------------------------------- |
| team_id | The team ID of the team to retrieve profile data for. |

<b>Optional Params:</b>

| Param            | Description                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| include_licenses | Whether or not to include license data in the response. For faster responses, only request license data when needed. |

### getUserTimeAttackData(ta_comp_season_id)

<p>Function to retrieve an authenticated members time attack results.</p>

<p>NOTE: This function has not been thorougly tested and may not work as expected.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getUserTimeAttackData({ta_comp_season_id: 12345})
</code></pre>

<b>Required Params:</b>

| Param             | Description                                                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| ta_comp_season_id | <p>The time attack competition season ID to retrieve data for. Defaults to the authenticated member but a season_id is still needed.</p> |

### getTrackData()

<p>Function to retrieve all tracks available on iRacing.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getTrackData() // Returns an array of all tracks available on iRacing
</code></pre>

### getTrackAssets()

<p>Function to retrieve track assets.</p>

<b>Example:</b>

<pre class="prettyprint source lang-typescript"><code>
iRacingSDK.getTrackAssets() // Returns all assets for the tracks available on iRacing
</code></pre>
