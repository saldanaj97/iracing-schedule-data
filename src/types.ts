type SessionStartData = {
  repeating: boolean
  super_session: boolean
  session_minutes: number
  session_times: string[]
}

type Track = {
  track_id: number
  track_name: string
  config_name: string
  category_id: number
  category: string
}

type TrackGeneralInfo = {
  id: string
  name: string
  category: string
}

type ScheduleEntry = {
  race_week_num: number
  race_lap_limit: number
  race_time_limit: number | null
  session_start_data: SessionStartData[]
  track: Track
}

type Schedule = ScheduleEntry[]

type SeriesData = {
  season_id: number
  series_id: number
  series_name: string
  car_class_ids: number[]
  track_type: string
  fixed_setup: boolean
  official: boolean
  license_group: string
  schedule: Schedule[]
}

type CarData = {
  id: number
  name: string
  shortName: string
}

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

export { AuthData, CarData, Schedule, ScheduleEntry, SeriesData, SessionStartData, Track, TrackGeneralInfo }
