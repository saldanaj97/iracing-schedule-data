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
  host: HostedSessionAdmin
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
  track_state: TrackState
  farm: {
    farm_id: number
    display_name: string
    image_path: string
    displayed: boolean
  }
  admins: HostedSessionAdmin[]
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

type DriverStandings = {
  rownum: number
  position: number
  driver: {
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
  car_number: null | string
  driver_nickname: null | string
  wins: number
  average_start: number
  average_finish: number
  base_points: number
  negative_adjustments: number
  positive_adjustments: number
  total_adjustments: number
  total_points: number
}

type Helmet = {
  pattern: number
  color1: string
  color2: string
  color3: string
  face_type: number
  helmet_type: number
}

type HostedSessionAdmin = {
  cust_id: number
  display_name: string
  helmet: Helmet
}

type League = {
  league_id: number
  owner_id: number
  league_name: string
  created: string
  about: string
  url: string | null
  roster_count: number
  recruiting: boolean
  is_admin: boolean
  is_member: boolean
  pending_application: boolean
  pending_invitation: boolean
  owner: LeagueOwner
}

type LeagueData = {
  league_id: number
  league_name: string
  owner: boolean
  admin: boolean
  league_mail_opt_out: boolean
  league_pm_opt_out: boolean
  car_number: null | string // The type is union of null and string to accommodate the possibility of a null value
  nick_name: null | string // Same as above
}

type LeagueInfo = {
  league_id: number
  owner_id: number
  league_name: string
  created: string
  hidden: boolean
  message: string
  about: string
  url: string
  recruiting: boolean
  rules: string
  private_wall: boolean
  private_roster: boolean
  private_schedule: boolean
  private_results: boolean
  is_owner: boolean
  is_admin: boolean
  roster_count: number
  owner: LeagueOwner
  image: {
    small_logo: any
    large_logo: any
  }
  tags: {
    categorized: any[][]
    not_categorized: any[]
  }
  league_applications: any[]
  pending_requests: any[]
  is_member: boolean
  is_applicant: boolean
  is_invite: boolean
  is_ignored: boolean
  roster: LeagueRosterMember[]
}

type LeagueOwner = {
  cust_id: number
  display_name: string
  helmet: Helmet
  car_number: null | number
  nick_name: null | string
}

type LeagueRosterMember = {
  cust_id: number
  display_name: string
  helmet: Helmet
  owner: boolean
  admin: boolean
  league_mail_opt_out: boolean
  league_pm_opt_out: boolean
  league_member_since: string
  car_number: number | null
  nick_name: string | null
}

type LeagueSeason = {
  league_id: number
  season_id: number
  points_system_id: number
  season_name: string
  active: boolean
  hidden: boolean
  num_drops: number
  no_drops_on_or_after_race_num: number
  points_cars: any[] // You may want to define a type for this array if possible
  driver_points_car_classes: any[] // You may want to define a type for this array if possible
  team_points_car_classes: any[] // You may want to define a type for this array if possible
  points_system_name: string
  points_system_desc: string
}

type LeagueSession = {
  cars: Car[]
  driver_changes: boolean
  entry_count: number
  has_results: boolean
  launch_at: string
  league_id: number
  league_season_id: number
  lone_qualify: boolean
  pace_car_class_id: number | null
  pace_car_id: number | null
  password_protected: boolean
  practice_length: number
  private_session_id: number
  qualify_laps: number
  qualify_length: number
  race_laps: number
  race_length: number
  session_id: number
  status: number
  subsession_id: number
  team_entry_count: number
  time_limit: number
  track: Track
  track_state: TrackState
  weather: LeagueSessionWeather
  winner_id: number
  winner_name: string
}

type LeagueSessionData = {
  sessions: LeagueSession[]
  success: boolean
  season_id: number
  league_id: number
}

type LeagueSessionWeather = {
  allow_fog: boolean
  fog: number
  precip_option: number
  rel_humidity: number
  skies: number
  temp_units: number
  temp_value: number
  track_water: number
  type: number
  version: number
  weather_var_initial: number
  weather_var_ongoing: number
  wind_dir: number
  wind_units: number
  wind_value: number
}

type LeagueStandings = {
  car_class_id: number
  success: boolean
  season_id: number
  car_id: number
  standings: {
    driver_standings: DriverStandings[]
    team_standings: any[] // Type this accordingly if you have the structure for team standings
  }
  league_id: number
}

type PointsSystem = {
  points_system_id: number
  name: string
  description: string
  league_id: number
  retired: boolean
  iracing_system: boolean
}

type PointsSystemsData = {
  subscribed: boolean
  success: boolean
  points_systems: PointsSystem[]
  league_id: number
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

type TrackState = {
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

type TrackType = {
  track_type: string
}

export {
  CustomLeagueSession,
  League,
  LeagueData,
  LeagueInfo,
  LeagueSeason,
  LeagueSessionData,
  LeagueStandings,
  PointsSystemsData,
}
