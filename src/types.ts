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

type CarInfo = {
  ai_enabled: boolean
  allow_number_colors: boolean
  allow_number_font: boolean
  allow_sponsor1: boolean
  allow_sponsor2: boolean
  allow_wheel_color: boolean
  award_exempt: boolean
  car_dirpath: string
  car_id: number
  car_name: string
  car_name_abbreviated: string
  car_types: { car_type: string }[]
  car_weight: number
  categories: string[]
  created: string // Assuming a string format for dates
  first_sale: string // Assuming a string format for dates
  forum_url: string
  free_with_subscription: boolean
  has_headlights: boolean
  has_multiple_dry_tire_types: boolean
  has_rain_capable_tire_types: boolean
  hp: number
  is_ps_purchasable: boolean
  max_power_adjust_pct: number
  max_weight_penalty_kg: number
  min_power_adjust_pct: number
  package_id: number
  patterns: number
  price: number
  price_display: string
  rain_enabled: boolean
  retired: boolean
  search_filters: string
  sku: number
}

type CarDetails = {
  car_dirpath: string
  car_id: number
  rain_enabled: boolean
  retired: boolean
}

type ConstantType = {
  label: string
  value: number
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
  session_start_data: RaceTimeDescriptor[]
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

type CarType = {
  car_type: string
}

type CarRestriction = {
  car_id: number
  max_dry_tire_sets: number
  max_pct_fuel_fill: number
  power_adjust_pct: number
  weight_penalty_kg: number
}

type RaceTimeDescriptor = {
  repeating: boolean
  session_minutes: number
  session_times?: Date[]
  super_session: boolean
  day_offset?: number[]
  first_session_time?: string
  start_date?: string
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

type Schedule = {
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
  race_time_limit: number | null
  race_week_cars?: never[]
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

type HostedSession = {
  subscribed: boolean
  sequence: number
  sessions: HostedSessionData[]
}

type HostedSessionData = {
  num_drivers: number
  num_spotters: number
  num_spectators: number
  num_broadcasters: number
  available_reserved_broadcaster_slots: number
  num_spectator_slots: number
  available_spectator_slots: number
  can_broadcast: boolean
  can_watch: boolean
  can_spot: boolean
  elig: HostedSessionEligibility
  driver_changes: boolean
  restrict_viewing: boolean
  max_users: number
  private_session_id: number
  session_id: number
  subsession_id: number
  password_protected: boolean
  session_name: string
  open_reg_expires: string
  launch_at: string
  full_course_cautions: boolean
  num_fast_tows: number
  rolling_starts: boolean
  restarts: number
  multiclass_type: number
  pits_in_use: number
  cars_left: number
  max_drivers: number
  hardcore_level: number
  practice_length: number
  lone_qualify: boolean
  qualify_laps: number
  qualify_length: number
  warmup_length: number
  race_laps: number
  race_length: number
  time_limit: number
  restrict_results: boolean
  incident_limit: number
  incident_warn_mode: number
  incident_warn_param1: number
  incident_warn_param2: number
  unsport_conduct_rule_mode: number
  lucky_dog: boolean
  min_team_drivers: number
  max_team_drivers: number
  qualifier_must_start_race: boolean
  driver_change_rule: number
  fixed_setup: boolean
  entry_count: number
  league_id: number
  league_season_id: number
  session_type: number
  order_id: number
  min_license_level: number
  max_license_level: number
  status: number
  pace_car_id: number | null
  pace_car_class_id: number | null
  num_opt_laps: number
  damage_model: number
  do_not_paint_cars: boolean
  green_white_checkered_limit: number
  do_not_count_caution_laps: boolean
  consec_cautions_single_file: boolean
  no_lapper_wave_arounds: boolean
  short_parade_lap: boolean
  start_on_qual_tire: boolean
  telemetry_restriction: number
  telemetry_force_to_disk: number
  max_ai_drivers: number
  ai_avoid_players: boolean
  must_use_diff_tire_types_in_race: boolean
  start_zone: boolean
  enable_pitlane_collisions: boolean
  disallow_virtual_mirror: boolean
  max_visor_tearoffs: number
  category_id: number
  category: string
  host: HostedSessionHostInfo
  track: HostedSessionTrackInfo
  weather: HostedSessionWeatherInfo
  track_state: HostedSessionTrackState
  farm: HostedSessionFarm
  admins: HostedSessionAdmin[]
  allowed_clubs: any[]
  allowed_teams: any[]
  allowed_leagues: any[]
  cars: HostedSessionCarInfo[]
  count_by_car_id: Record<string, number>
  count_by_car_class_id: Record<string, number>
  car_types: CarType[]
  track_types: TrackType[]
  license_group_types: LicenseGroupType[]
  event_types: HostedEventType[]
  session_types: HostedSessionType[]
  can_join: boolean
  sess_admin: boolean
  friends: any[]
  watched: any[]
  end_time: string
  is_heat_racing: boolean
  team_entry_count: number
  populated: boolean
  broadcaster: boolean
  min_ir: number
  max_ir: number
}

type HostedSessionEligibility = {
  session_full: boolean
  can_spot: boolean
  can_watch: boolean
  can_drive: boolean
  has_sess_password: boolean
  needs_purchase: boolean
  own_car: boolean
  own_track: boolean
  purchase_skus: number[]
  registered: boolean
}

type HostedSessionHostInfo = {
  cust_id: number
  display_name: string
  helmet: Helmet
}

type Helmet = {
  pattern: number
  color1: string
  color2: string
  color3: string
  face_type: number
  helmet_type: number
}

type HostedSessionTrackInfo = {
  category_id: number
  config_name?: string
  track_id: number
  track_name: string
}

type HostedSessionWeatherInfo = {
  allow_fog: boolean
  fog: number
  precip_option: number
  rel_humidity: number
  simulated_start_time: string
  simulated_time_multiplier: number
  simulated_time_offsets: number[]
  skies: number
  temp_units: number
  temp_value: number
  time_of_day: number
  track_water: number
  type: number
  version: number
  weather_var_initial: number
  weather_var_ongoing: number
  wind_dir: number
  wind_units: number
  wind_value: number
}

type HostedSessionTrackState = {
  leave_marbles: boolean
  practice_grip_compound: number
  practice_rubber: number
  qualify_grip_compound: number
  qualify_rubber: number
  race_grip_compound: number
  race_rubber: number
  warmup_grip_compound: number
  warmup_rubber: number
}

type HostedSessionFarm = {
  farm_id: number
  display_name: string
  image_path: string
  displayed: boolean
}

type HostedSessionAdmin = {
  cust_id: number
  display_name: string
  helmet: Helmet
}

type HostedSessionCarInfo = {
  car_id: number
  car_name: string
  car_class_id: number
  car_class_name: string
  max_pct_fuel_fill: number
  weight_penalty_kg: number
  power_adjust_pct: number
  max_dry_tire_sets: number
  package_id: number
}

type LicenseGroupType = {
  license_group_type: number
}

type HostedEventType = {
  event_type: number
}

type HostedSessionType = {
  session_type: number
}

type CustomLeagueSession = {
  num_drivers: number
  num_spotters: number
  num_spectators: number
  num_broadcasters: number
  available_reserved_broadcaster_slots: number
  num_spectator_slots: number
  available_spectator_slots: number
  can_broadcast: boolean
  can_watch: boolean
  can_spot: boolean
  elig: {
    session_full: boolean
    can_spot: boolean
    can_watch: boolean
    can_drive: boolean
    has_sess_password: boolean
    needs_purchase: boolean
    own_car: boolean
    own_track: boolean
    purchase_skus: number[]
    registered: boolean
  }
  driver_changes: boolean
  restrict_viewing: boolean
  max_users: number
  private_session_id: number
  session_id: number
  subsession_id: number
  password_protected: boolean
  session_name: string
  open_reg_expires: string
  launch_at: string
  full_course_cautions: boolean
  num_fast_tows: number
  rolling_starts: boolean
  restarts: number
  multiclass_type: number
  pits_in_use: number
  cars_left: number
  max_drivers: number
  hardcore_level: number
  practice_length: number
  lone_qualify: boolean
  qualify_laps: number
  qualify_length: number
  warmup_length: number
  race_laps: number
  race_length: number
  time_limit: number
  restrict_results: boolean
  incident_limit: number
  incident_warn_mode: number
  incident_warn_param1: number
  incident_warn_param2: number
  unsport_conduct_rule_mode: number
  lucky_dog: boolean
  min_team_drivers: number
  max_team_drivers: number
  qualifier_must_start_race: boolean
  driver_change_rule: number
  fixed_setup: boolean
  entry_count: number
  league_id: number
  league_name: string
  league_season_id: number
  session_type: number
  order_id: number
  min_license_level: number
  max_license_level: number
  status: number
  pace_car_id: number | null
  pace_car_class_id: number | null
  num_opt_laps: number
  damage_model: number
  do_not_paint_cars: boolean
  green_white_checkered_limit: number
  do_not_count_caution_laps: boolean
  consec_cautions_single_file: boolean
  no_lapper_wave_arounds: boolean
  short_parade_lap: boolean
  start_on_qual_tire: boolean
  telemetry_restriction: number
  telemetry_force_to_disk: number
  max_ai_drivers: number
  ai_min_skill: number
  ai_max_skill: number
  ai_roster_name: string
  ai_avoid_players: boolean
  must_use_diff_tire_types_in_race: boolean
  start_zone: boolean
  enable_pitlane_collisions: boolean
  disallow_virtual_mirror: boolean
  max_visor_tearoffs: number
  category_id: number
  category: string
  session_full: boolean
  host: {
    cust_id: number
    display_name: string
    helmet: {
      pattern: number
      color1: string
      color2: string
      color3: string
      face_type: number
      helmet_type: number
    }
  }
  track: {
    category_id: number
    config_name: string
    track_id: number
    track_name: string
  }
  weather: {
    allow_fog: boolean
    fog: number
    precip_option: number
    rel_humidity: number
    simulated_start_time: string
    simulated_time_multiplier: number
    simulated_time_offsets: number[]
    skies: number
    temp_units: number
    temp_value: number
    time_of_day: number
    track_water: number
    type: number
    version: number
    weather_var_initial: number
    weather_var_ongoing: number
    wind_dir: number
    wind_units: number
    wind_value: number
  }
  track_state: {
    leave_marbles: boolean
    practice_grip_compound: number
    practice_rubber: number
    qualify_grip_compound: number
    qualify_rubber: number
    race_grip_compound: number
    race_rubber: number
    warmup_grip_compound: number
    warmup_rubber: number
  }
  farm: {
    farm_id: number
    display_name: string
    image_path: string
    displayed: boolean
  }
  admins: {
    cust_id: number
    display_name: string
    helmet: {
      pattern: number
      color1: string
      color2: string
      color3: string
      face_type: number
      helmet_type: number
    }
  }[]
  allowed_clubs: any[]
  allowed_teams: any[]
  allowed_leagues: number[]
  cars: {
    car_id: number
    car_name: string
    car_class_id: number
    car_class_name: string
    max_pct_fuel_fill: number
    weight_penalty_kg: number
    power_adjust_pct: number
    max_dry_tire_sets: number
    package_id: number
  }[]
  count_by_car_id: {
    [key: string]: number
  }
  count_by_car_class_id: {
    [key: string]: number
  }
  car_types: {
    car_type: string
  }[]
  track_types: {
    track_type: string
  }[]
  license_group_types: {
    license_group_type: number
  }[]
  event_types: {
    event_type: number
  }[]
  session_types: {
    session_type: number
  }[]
  can_join: boolean
  owner: boolean
  admin: boolean
  friends: any[]
  watched: any[]
  end_time: string
  is_heat_racing: boolean
  team_entry_count: number
  populated: boolean
  broadcaster: boolean
  min_ir: number
  max_ir: number
}

export type {
  AuthData,
  AuthResponse,
  Car,
  CarInfo,
  CarRestriction,
  CarType,
  ConstantType,
  CustomLeagueSession,
  HostedSession,
  RacingSeason,
  Schedule,
  ScheduledRace,
  Series,
  SeriesSchedule,
  Track,
  TrackInfo,
  WeatherInfo,
}
