type AuthData = {
  authcode: string
  autoLoginSeries: null
  autoLoginToken: null
  custId: number
  email: string
  ssoCookieDomain: string
  ssoCookieName: string
  ssoCookiePath: string
  ssoCookieValue: string
}

type AuthResponse = {
  authcode?: number
  inactive?: boolean
  message?: string
  verificationRequired?: boolean
}

type Car = {
  car_class_id: number
  cars_in_class: CarDetails[]
  cust_id: number
  name: string
  rain_enabled: boolean
  relative_speed: number
  short_name: string
}

type CarDetails = {
  car_dirpath: string
  car_id: number
  rain_enabled: boolean
  retired: boolean
}

type LicenseRange = {
  license_group: number
  min_license_level: number
  max_license_level: number
  group_name: string
}

type RaceDayTrackInfo = {
  category: string
  category_id: number
  config_name?: string
  track_id: number
  track_name: string
}

type ScheduledRace = {
  race_week_num: number
  race_lap_limit: number
  race_time_limit: number | null
  session_start_data: SessionStartData[]
  track: RaceDayTrackInfo
}

type SeriesSchedule = {
  season_id: number
  series_id: number
  car_class_ids: number[]
  track_type: string
  fixed_setup: boolean
  official: boolean
  license_group: number
  schedule: ScheduledRace[]
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

type SessionStartData = {
  repeating: boolean
  super_session: boolean
  session_minutes: number
  session_times: string[]
}

type Track = {
  ai_enabled: boolean
  allow_pitlane_collisions: boolean
  allow_rolling_start: boolean
  allow_standing_start: boolean
  award_exempt: boolean
  category: string
  category_id: number
  closes: string
  config_name: string
  corners_per_lap: number
  created: string
  first_sale: string
  free_with_subscription: boolean
  fully_lit: boolean
  grid_stalls: number
  has_opt_path: boolean
  has_short_parade_lap: boolean
  has_start_zone: boolean
  has_svg_map: boolean
  is_dirt: boolean
  is_oval: boolean
  is_ps_purchasable: boolean
  lap_scoring: number
  latitude: number
  location: string
  longitude: number
  max_cars: number
  night_lighting: boolean
  nominal_lap_time: number
  number_pitstalls: number
  opens: string
  package_id: number
  pit_road_speed_limit: number
  price: number
  price_display: string
  priority: number
  purchasable: boolean
  qualify_laps: number
  rain_enabled: boolean
  restart_on_left: boolean
  retired: boolean
  search_filters: string
  site_url: string
  sku: number
  solo_laps: number
  start_on_left: boolean
  supports_grip_compound: boolean
  tech_track: boolean
  time_zone: string
  track_config_length: number
  track_dirpath: string
  track_id: number
  track_name: string
  track_types: TrackType[]
}

type TrackType = {
  track_type: string
}

interface CarType {
  car_type: string
}

interface CarRestriction {
  car_id: number
  max_dry_tire_sets: number
  max_pct_fuel_fill: number
  power_adjust_pct: number
  weight_penalty_kg: number
}

interface RaceTimeDescriptor {
  repeating: boolean
  session_minutes: number
  session_times: string[]
  super_session: boolean
}

interface TrackInfo {
  category: string
  category_id: number
  config_name: string
  track_id: number
  track_name: string
}

interface WeatherInfo {
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

interface Schedule {
  season_id: number
  race_week_num: number
  car_restrictions: CarRestriction[]
  category: string
  category_id: number
  enable_pitlane_collisions: boolean
  full_course_cautions: boolean
  qual_attached: boolean
  race_lap_limit: number
  race_time_descriptors: RaceTimeDescriptor[]
  race_time_limit: number | null // Replace 'any' with appropriate type if possible
  race_week_cars: []
  restart_type: string
  schedule_name: string
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

interface RacingSeason {
  active: boolean
  allowed_season_members: null
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

export {
  AuthData,
  AuthResponse,
  Car,
  CarRestriction,
  CarType,
  RaceTimeDescriptor,
  RacingSeason,
  Schedule,
  ScheduledRace,
  Series,
  SeriesSchedule,
  SessionStartData,
  Track,
  TrackInfo,
  WeatherInfo,
}
