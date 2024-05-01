type CarClass = {
  car_class_id: number
  name: string
  relative_speed: number
  short_name: string
}

type CarRestriction = {
  car_id: number
  max_dry_tire_sets: number
  max_pct_fuel_fill: number
  power_adjust_pct: number
  weight_penalty_kg: number
}

type CarType = {
  car_type: string
}

type License = {
  group_name: string
  license_group: number
  max_license_level: number
  min_license_level: number
  parent_id: number
}

type LicenseRange = {
  group_name: string
  license_group: number
  max_license_level: number
  min_license_level: number
}

type PastSeason = {
  active: boolean
  car_classes: CarClass[]
  driver_changes: boolean
  fixed_setup: boolean
  has_supersessions: boolean
  license_group: number
  license_group_types: { license_group_type: number }[]
  official: boolean
  season_id: number
  season_name: string
  season_quarter: number
  season_short_name: string
  season_year: number
}

type PastSeries = {
  active: boolean
  allowed_licenses: License[]
  category: string
  category_id: number
  fixed_setup: boolean
  license_group: number
  license_group_types: { license_group_type: number }[]
  logo: string | null
  official: boolean
  seasons: PastSeason[]
  series_id: number
  series_name: string
  series_short_name: string
}

type RaceTimeDescriptor = {
  day_offset?: number[]
  first_session_time?: string
  repeating: boolean
  session_minutes: number
  session_times?: Date[]
  start_date?: string
  super_session: boolean
}

type RaceWeek = {
  season_id: number
  race_week_num: number
  track: Track
}

type RacingSeason = {
  active: boolean
  car_class_ids: number[]
  car_switching: boolean
  car_types: CarType[]
  caution_laps_do_not_count: boolean
  complete: boolean
  cross_license: boolean
  driver_change_rule: number
  driver_changes: boolean
  drops: number
  enable_pitlane_collisions: boolean
  fixed_setup: boolean
  green_white_checkered_limit: number
  grid_by_class: boolean
  hardcore_level: number
  has_supersessions: boolean
  ignore_license_for_practice: boolean
  incident_limit: number
  incident_warn_mode: number
  incident_warn_param1: number
  incident_warn_param2: number
  is_heat_racing: boolean
  license_group: number
  license_group_types: { license_group_type: number }[]
  lucky_dog: boolean
  max_team_drivers: number
  max_weeks: number
  min_team_drivers: number
  multiclass: boolean
  must_use_diff_tire_types_in_race: boolean
  next_race_session: null
  num_opt_laps: number
  official: boolean
  op_duration: number
  open_practice_session_type_id: number
  qualifier_must_start_race: boolean
  race_week: number
  race_week_to_make_divisions: number
  reg_user_count: number
  region_competition: boolean
  restrict_by_member: boolean
  restrict_to_car: boolean
  restrict_viewing: boolean
  schedule_description: string
  schedules: Schedule[]
  season_id: number
  season_name: string
}

type Schedule = {
  car_restrictions: CarRestriction[]
  category: string
  category_id: number
  enable_pitlane_collisions: boolean
  full_course_cautions: boolean
  qual_attached: boolean
  race_lap_limit: number
  race_time_descriptors: RaceTimeDescriptor[]
  race_time_limit: number | null
  race_week_cars?: never[]
  restart_type: string
  schedule_name: string
  season_id: number
  season_name: string
  series_id: number
  series_name: string
  short_parade_lap: boolean
  simulated_time_multiplier: number
  special_event_type: null
  start_date: string
  start_type: string
  start_zone: boolean
  track: TrackInfo
  track_state: { leave_marbles: boolean }
  weather: WeatherInfo
}

type Season = {
  season_id: number
  series_id: number
  season_name: string
  season_short_name: string
  season_year: number
  season_quarter: number
  active: boolean
  official: boolean
  driver_changes: boolean
  fixed_setup: boolean
  license_group: number
  has_supersessions: boolean
  license_group_types: { license_group_type: number }[]
  car_classes: CarClass[]
  race_weeks: RaceWeek[]
}

type Series = {
  allowed_licenses: LicenseRange[]
  category: string
  category_id: number
  eligible: boolean
  forum_url?: string
  max_starters: number
  min_starters: number
  oval_caution_type: number
  road_caution_type: number
  search_filters?: string
  series_id: number
  series_name: string
  series_short_name: string
}

type SeriesAssets = {
  [key: string]: {
    large_image: string | null
    logo: string
    series_copy: string
    series_id: number
    small_image: string | null
  }
}

type SeriesStats = {
  active: boolean
  allowed_licenses: License[]
  category: string
  category_id: number
  fixed_setup: boolean
  license_group: number
  license_group_types: { license_group_type: number }[]
  logo: string
  official: boolean
  search_filters: string
  series_id: number
  series_name: string
  series_short_name: string
  seasons: Season[]
}

type Track = {
  config_name?: string
  track_id: number
  track_name: string
}

type TrackInfo = {
  category: string
  category_id: number
  config_name: string
  track_id: number
  track_name: string
}

type WeatherInfo = {
  fog: number
  rel_humidity: number
  simulated_start_time: string
  simulated_start_utc_time: string
  simulated_time_multiplier: number
  simulated_time_offsets: number[]
  skies: number
  temp_units: number
  temp_value: number
  time_of_day: number
  type: number
  version: number
  weather_var_initial: number
  weather_var_ongoing: number
  wind_dir: number
  wind_units: number
  wind_value: number
}

export { PastSeries, RacingSeason, Series, SeriesAssets, SeriesStats }
