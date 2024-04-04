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

type AuthResponse = {
  authcode?: number
  inactive?: boolean
  message?: string
  verificationRequired?: boolean
}

type Car = {
  car_dirpath: string
  car_id: number
  rain_enabled: boolean
  retired: boolean
}

type CarClass = {
  car_class_id: number
  cars_in_class: Car[]
  cust_id: number
  name: string
  rain_enabled: boolean
  relative_speed: number
  short_name: string
}

type CarClasses = CarClass[]

type LicenseRange = {
  license_group: number
  min_license_level: number
  max_license_level: number
  group_name: string
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

type SeriesList = Series[]

export {
  AuthData,
  AuthResponse,
  CarClasses,
  CarData,
  Schedule,
  ScheduleEntry,
  Series,
  SeriesData,
  SeriesList,
  SessionStartData,
  Track,
  TrackGeneralInfo,
}
