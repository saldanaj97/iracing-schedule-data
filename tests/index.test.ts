import {
  fetchAuthCookieMock,
  getAllCarsMock,
  getAllSeriesMock,
  getAllSeriesSchedulesMock,
  getAllTracksMock,
} from "../__mocks__/iracingMocks"

jest.mock("../src/index.ts", () => ({
  fetchAuthCookie: () => fetchAuthCookieMock({ username: "sampleUsername", password: "samplePassword" }),
  getSeriesData: () => getAllSeriesMock(),
  getDetailedSeriesData: () => getAllSeriesSchedulesMock(),
  getListOfAllCars: () => getAllCarsMock(),
  getTrackData: () => getAllTracksMock(),
  writeDataToFile: jest.fn(),
}))

describe("index.ts", () => {
  describe("fetchAuthCookie", () => {
    it("should authenticate with iRacing API and update the cookie", async () => {
      // Call the fetchAuthCookie function with sample username and password
      const result = await fetchAuthCookieMock({ username: "sampleUsername", password: "samplePassword" })

      // Verify that the function returns the expected token
      expect(result).toEqual({
        authcode: expect.any(String),
        autoLoginSeries: null,
        autoLoginToken: null,
        custId: expect.any(Number),
        email: expect.any(String),
        ssoCookieDomain: expect.any(String),
        ssoCookieName: expect.any(String),
        ssoCookiePath: expect.any(String),
        ssoCookieValue: expect.any(String),
      })
    })
  })

  describe("getSeriesData", () => {
    it("should retrieve the basic data about every active series in the current season", async () => {
      const mockSeriesData = await getAllSeriesMock()
      expect(mockSeriesData).toContainEqual({
        allowed_licenses: expect.arrayContaining([
          expect.objectContaining({
            license_group: expect.any(Number),
            min_license_level: expect.any(Number),
            max_license_level: expect.any(Number),
            group_name: expect.any(String),
          }),
        ]),
        category: expect.any(String),
        category_id: expect.any(Number),
        eligible: expect.any(Boolean),
        forum_url: expect.any(String),
        max_starters: expect.any(Number),
        min_starters: expect.any(Number),
        oval_caution_type: expect.any(Number),
        road_caution_type: expect.any(Number),
        series_id: expect.any(Number),
        series_name: expect.any(String),
        series_short_name: expect.any(String),
      })
    })
  })

  describe("getDetailedSeriesData", () => {
    it("should retrieve the detailed season series data for every series in the current season", async () => {
      const response = await getAllSeriesSchedulesMock()

      // Assert that the response is an array
      expect(Array.isArray(response)).toBe(true)

      // Assert the properties of each object in the response
      response!.forEach((series) => {
        expect(series).toEqual(
          expect.objectContaining({
            season_id: expect.any(Number),
            season_name: expect.any(String),
            active: expect.any(Boolean),
            allowed_season_members: null,
            car_class_ids: expect.any(Array),
            car_switching: expect.any(Boolean),
            car_types: expect.any(Array),
            caution_laps_do_not_count: expect.any(Boolean),
            complete: expect.any(Boolean),
            cross_license: expect.any(Boolean),
            driver_change_rule: expect.any(Number),
            driver_changes: expect.any(Boolean),
            drops: expect.any(Number),
            enable_pitlane_collisions: expect.any(Boolean),
            fixed_setup: expect.any(Boolean),
            green_white_checkered_limit: expect.any(Number),
            grid_by_class: expect.any(Boolean),
            hardcore_level: expect.any(Number),
            has_supersessions: expect.any(Boolean),
            ignore_license_for_practice: expect.any(Boolean),
            incident_limit: expect.any(Number),
            incident_warn_mode: expect.any(Number),
            incident_warn_param1: expect.any(Number),
            incident_warn_param2: expect.any(Number),
            is_heat_racing: expect.any(Boolean),
            license_group: expect.any(Number),
            license_group_types: expect.any(Array),
            lucky_dog: expect.any(Boolean),
            max_team_drivers: expect.any(Number),
            max_weeks: expect.any(Number),
            min_team_drivers: expect.any(Number),
            multiclass: expect.any(Boolean),
            must_use_diff_tire_types_in_race: expect.any(Boolean),
            next_race_session: null,
            num_opt_laps: expect.any(Number),
            official: expect.any(Boolean),
            op_duration: expect.any(Number),
            open_practice_session_type_id: expect.any(Number),
            qualifier_must_start_race: expect.any(Boolean),
            race_week: expect.any(Number),
            race_week_to_make_divisions: expect.any(Number),
            reg_user_count: expect.any(Number),
            region_competition: expect.any(Boolean),
            restrict_by_member: expect.any(Boolean),
            restrict_to_car: expect.any(Boolean),
            restrict_viewing: expect.any(Boolean),
            schedule_description: expect.any(String),
            schedules: expect.any(Array),
            season_quarter: expect.any(Number),
            season_short_name: expect.any(String),
            season_year: expect.any(Number),
            send_to_open_practice: expect.any(Boolean),
            series_id: expect.any(Number),
            short_parade_lap: expect.any(Boolean),
            start_date: expect.any(String),
            start_on_qual_tire: expect.any(Boolean),
            start_zone: expect.any(Boolean),
            track_types: expect.any(Array),
            unsport_conduct_rule_mode: expect.any(Number),
          })
        )
      })
    })
  })

  describe("getListOfAllCars", () => {
    it("should return a list of all cars available on the service", async () => {
      const mockCarList = await getAllCarsMock()
      expect(mockCarList).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ai_enabled: expect.any(Boolean),
            allow_number_colors: expect.any(Boolean),
            allow_number_font: expect.any(Boolean),
            allow_sponsor1: expect.any(Boolean),
            allow_sponsor2: expect.any(Boolean),
            allow_wheel_color: expect.any(Boolean),
            award_exempt: expect.any(Boolean),
            car_dirpath: expect.any(String),
            car_id: expect.any(Number),
            car_name: expect.any(String),
            car_name_abbreviated: expect.any(String),
            car_types: expect.arrayContaining([
              expect.objectContaining({
                car_type: expect.any(String),
              }),
            ]),
            car_weight: expect.any(Number),
            categories: expect.arrayContaining([expect.any(String)]),
            created: expect.any(String),
            first_sale: expect.any(String),
            forum_url: expect.any(String),
            free_with_subscription: expect.any(Boolean),
            has_headlights: expect.any(Boolean),
            has_multiple_dry_tire_types: expect.any(Boolean),
            has_rain_capable_tire_types: expect.any(Boolean),
            hp: expect.any(Number),
            is_ps_purchasable: expect.any(Boolean),
            max_power_adjust_pct: expect.any(Number),
            max_weight_penalty_kg: expect.any(Number),
            min_power_adjust_pct: expect.any(Number),
            package_id: expect.any(Number),
            patterns: expect.any(Number),
            price: expect.any(Number),
            price_display: expect.any(String),
            rain_enabled: expect.any(Boolean),
            retired: expect.any(Boolean),
            search_filters: expect.any(String),
            sku: expect.any(Number),
          }),
        ])
      )
    })
  })

  describe("getTrackData", () => {
    it("should return a list of all tracks available on the service", async () => {
      const mockTrackList = await getAllTracksMock()
      expect(mockTrackList).toContainEqual({
        ai_enabled: expect.any(Boolean),
        allow_pitlane_collisions: expect.any(Boolean),
        allow_rolling_start: expect.any(Boolean),
        allow_standing_start: expect.any(Boolean),
        award_exempt: expect.any(Boolean),
        category: expect.any(String),
        category_id: expect.any(Number),
        closes: expect.any(String),
        config_name: expect.any(String),
        corners_per_lap: expect.any(Number),
        created: expect.any(String),
        first_sale: expect.any(String),
        free_with_subscription: expect.any(Boolean),
        fully_lit: expect.any(Boolean),
        grid_stalls: expect.any(Number),
        has_opt_path: expect.any(Boolean),
        has_short_parade_lap: expect.any(Boolean),
        has_start_zone: expect.any(Boolean),
        has_svg_map: expect.any(Boolean),
        is_dirt: expect.any(Boolean),
        is_oval: expect.any(Boolean),
        is_ps_purchasable: expect.any(Boolean),
        lap_scoring: expect.any(Number),
        latitude: expect.any(Number),
        location: expect.any(String),
        longitude: expect.any(Number),
        max_cars: expect.any(Number),
        night_lighting: expect.any(Boolean),
        nominal_lap_time: expect.any(Number),
        number_pitstalls: expect.any(Number),
        opens: expect.any(String),
        package_id: expect.any(Number),
        pit_road_speed_limit: expect.any(Number),
        price: expect.any(Number),
        price_display: expect.any(String),
        priority: expect.any(Number),
        purchasable: expect.any(Boolean),
        qualify_laps: expect.any(Number),
        rain_enabled: expect.any(Boolean),
        restart_on_left: expect.any(Boolean),
        retired: expect.any(Boolean),
        search_filters: expect.any(String),
        site_url: expect.any(String),
        sku: expect.any(Number),
        solo_laps: expect.any(Number),
        start_on_left: expect.any(Boolean),
        supports_grip_compound: expect.any(Boolean),
        tech_track: expect.any(Boolean),
        time_zone: expect.any(String),
        track_config_length: expect.any(Number),
        track_dirpath: expect.any(String),
        track_id: expect.any(Number),
        track_name: expect.any(String),
        track_types: expect.any(Array),
      })
    })
  })

  describe("writeDataToFile", () => {
    it("should write JSON data to the specified file", () => {
      // Test implementation here
    })
  })
})
