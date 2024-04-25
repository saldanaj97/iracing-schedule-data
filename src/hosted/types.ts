type CarType = {
  car_type: string
}

type Helmet = {
  pattern: number
  color1: string
  color2: string
  color3: string
  face_type: number
  helmet_type: number
}

type HostedEventType = {
  event_type: number
}

type HostedSession = {
  subscribed: boolean
  sequence: number
  sessions: HostedSessionData[]
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
  host: HostedSessionAdmin
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

type HostedSessionFarm = {
  farm_id: number
  display_name: string
  image_path: string
  displayed: boolean
}

type HostedSessionTrackInfo = {
  category_id: number
  config_name?: string
  track_id: number
  track_name: string
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

type HostedSessionType = {
  session_type: number
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

type LicenseGroupType = {
  license_group_type: number
}

type TrackType = {
  track_type: string
}

export { HostedSession }
