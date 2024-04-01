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

type Schedule = {
  race_week_num: number
  race_lap_limit: string
  race_time_limit: string
  session_start_data: string
  track: string
}

type CarData = {
  id: number
  name: string
  shortName: string
}

type Track = {
  id: number
  name: string
  category: string
}

export { CarData, Schedule, SeriesData, Track }
