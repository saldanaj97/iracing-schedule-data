import { RacingSeason, Series } from "./types"
import { client } from "./utils/axiosSetup"

/**
 * Function to get series data current season (not as much detail as the get series data function)
 * @returns BASIC data about every active series in this season
 */
export const getAllSeriesInCurrentSeason = async (): Promise<Series[] | Error> => {
  const URL = `https://members-ng.iracing.com/data/series/get`
  try {
    const { link } = await client.get(URL).then((response) => response.data)
    const { data } = await client.get(link).then((response) => response.data)
    return data
  } catch (error) {
    return error as Error
  }
}

/**
 * Retrieves the detailed season series data for EVERY series in the current season.
 * @returns The season series data.
 */
export const getDetailedSeriesData = async (): Promise<RacingSeason[] | undefined> => {
  try {
    const URL = "https://members-ng.iracing.com/data/series/seasons?include_series=1"
    const { link } = (await client.get(URL)).data

    const seasonSeriesData: RacingSeason[] = []

    for (const series of (await client.get(link)).data) {
      const {
        active,
        car_class_ids,
        car_switching,
        car_types,
        caution_laps_do_not_count,
        complete,
        cross_license,
        driver_change_rule,
        driver_changes,
        drops,
        enable_pitlane_collisions,
        fixed_setup,
        green_white_checkered_limit,
        grid_by_class,
        hardcore_level,
        has_supersessions,
        ignore_license_for_practice,
        incident_limit,
        incident_warn_mode,
        incident_warn_param1,
        incident_warn_param2,
        is_heat_racing,
        license_group,
        license_group_types,
        lucky_dog,
        max_team_drivers,
        max_weeks,
        min_team_drivers,
        multiclass,
        must_use_diff_tire_types_in_race,
        next_race_session,
        num_opt_laps,
        official,
        op_duration,
        open_practice_session_type_id,
        qualifier_must_start_race,
        race_week,
        race_week_to_make_divisions,
        reg_user_count,
        region_competition,
        restrict_by_member,
        restrict_to_car,
        restrict_viewing,
        schedule_description,
        schedules,
        season_id,
        season_name,
      } = series

      seasonSeriesData.push({
        active,
        car_class_ids,
        car_switching,
        car_types,
        caution_laps_do_not_count,
        complete,
        cross_license,
        driver_change_rule,
        driver_changes,
        drops,
        enable_pitlane_collisions,
        fixed_setup,
        green_white_checkered_limit,
        grid_by_class,
        hardcore_level,
        has_supersessions,
        ignore_license_for_practice,
        incident_limit,
        incident_warn_mode,
        incident_warn_param1,
        incident_warn_param2,
        is_heat_racing,
        license_group,
        license_group_types,
        lucky_dog,
        max_team_drivers,
        max_weeks,
        min_team_drivers,
        multiclass,
        must_use_diff_tire_types_in_race,
        next_race_session,
        num_opt_laps,
        official,
        op_duration,
        open_practice_session_type_id,
        qualifier_must_start_race,
        race_week,
        race_week_to_make_divisions,
        reg_user_count,
        region_competition,
        restrict_by_member,
        restrict_to_car,
        restrict_viewing,
        schedule_description,
        schedules,
        season_id,
        season_name,
      })
    }

    return seasonSeriesData
  } catch (error) {
    console.error(error)
    return undefined
  }
}
