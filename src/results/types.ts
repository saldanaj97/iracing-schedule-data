type License = {
  parent_id: number
  license_group: number
  min_license_level: number
  max_license_level: number
  group_name: string
}

type CarClass = {
  car_class_id: number
  cars_in_class: any[]
  name: string
  short_name: string
}

type SessionResult = {
  simsession_number: number
  simsession_type: number
  simsession_type_name: string
  simsession_subtype: number
  simsession_name: string
  results: any[]
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

type Weather = {
  allow_fog: boolean
  fog: number
  precip_mm2hr_before_final_session: number
  precip_mm_final_session: number
  precip_option: number
  precip_time_pct: number
  rel_humidity: number
  simulated_start_utc_offset: number
  simulated_start_utc_time: string
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

type Subsession = {
  subsession_id: number
  allowed_licenses: License[]
  associated_subsession_ids: number[]
  can_protest: boolean
  car_classes: CarClass[]
  caution_type: number
  cooldown_minutes: number
  corners_per_lap: number
  damage_model: number
  driver_change_param1: number
  driver_change_param2: number
  driver_change_rule: number
  driver_changes: boolean
  event_average_lap: number
  event_laps_complete: number
  event_strength_of_field: number
  event_type: number
  event_type_name: string
  heat_info_id: number
  license_category: string
  license_category_id: number
  limit_minutes: number
  max_team_drivers: number
  max_weeks: number
  min_team_drivers: number
  num_caution_laps: number
  num_cautions: number
  num_laps_for_qual_average: number
  num_laps_for_solo_average: number
  num_lead_changes: number
  official_session: boolean
  points_type: string
  private_session_id: number
  race_week_num: number
  results_restricted: boolean
  season_id: number
  season_name: string
  season_quarter: number
  season_short_name: string
  season_year: number
  series_id: number
  series_logo: string
  series_name: string
  series_short_name: string
  session_id: number
  session_results: SessionResult[]
  session_splits: { subsession_id: number; event_strength_of_field: number }[]
  special_event_type: number
  start_time: string
  track: {
    category: string
    category_id: number
    config_name: string
    track_id: number
    track_name: string
  }
  track_state: TrackState
  weather: Weather
}

type TrackInfo = {
  config_name: string
  track_id: number
  track_name: string
}

type SubsessionEventInfo = {
  subsession_id: number
  session_id: number
  simsession_number: number
  simsession_type: number
  simsession_name: string
  event_type: number
  event_type_name: string
  private_session_id: number
  season_name: string
  season_short_name: string
  series_name: string
  series_short_name: string
  start_time: Date
  track: TrackInfo
}

type ChunkInfo = {
  chunk_size: number
  num_chunks: number
  rows: number
  base_download_url: string
  chunk_file_names: string[]
}

type SessionData = {
  session_info: SubsessionEventInfo
  chunk_info: ChunkInfo
}

type Params = {
  [key: string]: number[] | number | boolean | string
}

type SearchSeriesResults = {
  type: string
  data: {
    success: boolean
    chunk_info: ChunkInfo
    params: Params
  }
}

export { SearchSeriesResults, SessionData, Subsession, SubsessionEventInfo }
