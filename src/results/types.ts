type CarClass = {
  car_class_id: number
  cars_in_class: any[]
  name: string
  short_name: string
}

type ChunkInfo = {
  chunk_size: number
  num_chunks: number
  rows: number
  base_download_url: string
  chunk_file_names: string[]
}

type DetailedSessionResult = {
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
  end_time: string
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
  race_summary: {
    subsession_id: number
    average_lap: number
    laps_complete: number
    num_cautions: number
    num_caution_laps: number
    num_lead_changes: number
    field_strength: number
    num_opt_laps: number
    has_opt_path: boolean
    special_event_type: number
    special_event_type_text: string
  }
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
  session_results: {
    simsession_number: number
    simsession_type: number
    simsession_type_name: string
    simsession_subtype: number
    simsession_name: string
    weather_result: Weather
    results: {
      cust_id: number
      display_name: string
      finish_position: number
      finish_position_in_class: number
      laps_lead: number
      laps_complete: number
      opt_laps_complete: number
      interval: number
      class_interval: number
      average_lap: number
      best_lap_num: number
      best_lap_time: number
      best_nlaps_num: number
      best_nlaps_time: number
      best_qual_lap_at: string
      best_qual_lap_num: number
      best_qual_lap_time: number
      reason_out_id: number
      reason_out: string
      champ_points: number
      drop_race: boolean
      club_points: number
      position: number
      qual_lap_time: number
      starting_position: number
      starting_position_in_class: number
      car_class_id: number
      car_class_name: string
      car_class_short_name: string
      club_id: number
      club_name: string
      club_shortname: string
      division: number
      division_name: string
      old_license_level: number
      old_sub_level: number
      old_cpi: number
      oldi_rating: number
      old_ttrating: number
      new_license_level: number
      new_sub_level: number
      new_cpi: number
      newi_rating: number
      new_ttrating: number
      multiplier: number
      license_change_oval: number
      license_change_road: number
      incidents: number
      max_pct_fuel_fill: number
      weight_penalty_kg: number
      league_points: number
      league_agg_points: number
      car_id: number
      car_name: string
      aggregate_champ_points: number
      livery: {
        car_id: number
        pattern: number
        color1: string
        color2: string
        color3: string
        number_font: number
        number_color1: string
        number_color2: string
        number_color3: string
        number_slant: number
        sponsor1: number
        sponsor2: number
        car_number: string
        wheel_color: string | null
        rim_type: number
      }
      suit: {
        pattern: number
        color1: string
        color2: string
        color3: string
      }
      helmet: {
        pattern: number
        color1: string
        color2: string
        color3: string
        face_type: number
        helmet_type: number
      }
      watched: boolean
      friend: boolean
      ai: boolean
    }[]
  }[]
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
  weather: Weather
}

type EventLogInfo = {
  success: boolean
  session_info: SessionInfo
  chunk_info: ChunkInfo
}

type HostedSearchResults = {
  type: string
  data: {
    success: boolean
    chunk_info: ChunkInfo
    params: Params
  }
}

type LapChartInfo = {
  success: boolean
  session_info: SessionInfo
  best_lap_num: number
  best_lap_time: number
  best_nlaps_num: number
  best_nlaps_time: number
  best_qual_lap_num: number
  best_qual_lap_time: number
  best_qual_lap_at: null | any
  chunk_info: ChunkInfo
}

type LapData = {
  success: boolean
  session_info: SessionInfo
  best_lap_num: number
  best_lap_time: number
  best_nlaps_num: number
  best_nlaps_time: number
  best_qual_lap_num: number
  best_qual_lap_time: number
  best_qual_lap_at: null | any
  chunk_info: ChunkInfo
  group_id: number
  cust_id: number
  name: string
  car_id: number
  license_level: number
  livery: LiveryInfo
}

type License = {
  parent_id: number
  license_group: number
  min_license_level: number
  max_license_level: number
  group_name: string
}

type LiveryInfo = {
  car_id: number
  pattern: number
  color1: string
  color2: string
  color3: string
  number_font: number
  number_color1: string
  number_color2: string
  number_color3: string
  number_slant: number
  sponsor1: number
  sponsor2: number
  car_number: string
  wheel_color: string | null
  rim_type: number
}

type Params = {
  [key: string]: number[] | number | boolean | string
}

type SeasonSearchResults = {
  results_list: SessionEventData[]
  event_type: number | null
  success: boolean
  season_id: number
  race_week_num: number | null
}

type SeriesSearchResults = {
  type: string
  data: {
    success: boolean
    chunk_info: ChunkInfo
    params: Params
  }
}

type SessionData = {
  session_info: SubsessionEventInfo
  chunk_info: ChunkInfo
}

type SessionEventData = {
  race_week_num: number
  event_type: number
  event_type_name: string
  start_time: string
  session_id: number
  subsession_id: number
  official_session: boolean
  event_strength_of_field: number
  event_best_lap_time: number
  num_cautions: number
  num_caution_laps: number
  num_lead_changes: number
  num_drivers: number
  track: {
    config_name: string
    track_id: number
    track_name: string
  }
  car_classes: {
    car_class_id: number
    short_name: string
    name: string
    num_entries: number
    strength_of_field: number
  }
}

type SessionInfo = {
  subsession_id: number
  session_id: number
  simsession_number: number
  simsession_type: number
  simsession_name: string
  num_laps_for_qual_average: number
  num_laps_for_solo_average: number
  event_type: number
  event_type_name: string
  private_session_id: number
  season_name: string
  season_short_name: string
  series_name: string
  series_short_name: string
  start_time: string
  track: TrackInfo
}

type SessionResult = {
  simsession_number: number
  simsession_type: number
  simsession_type_name: string
  simsession_subtype: number
  simsession_name: string
  results: any[]
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

type TrackInfo = {
  config_name: string
  track_id: number
  track_name: string
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

export {
  DetailedSessionResult,
  EventLogInfo,
  HostedSearchResults,
  LapChartInfo,
  LapData,
  SeasonSearchResults,
  SeriesSearchResults,
  SessionData,
  Subsession,
  SubsessionEventInfo,
}
