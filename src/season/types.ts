type RaceGuide = {
  subscribed: boolean
  sessions: Session[]
  block_begin_time: string
  block_end_time: string
  success: boolean
}

type Series = {
  season_id: number
  series_id: number
  season_name: string
  series_name: string
  official: boolean
  season_year: number
  season_quarter: number
  license_group: number
  fixed_setup: boolean
  driver_changes: boolean
}

type SeasonList = {
  season_quarter: number
  seasons: Series[]
  season_year: number
}

type Session = {
  season_id: number
  start_time: string
  super_session: boolean
  series_id: number
  race_week_num: number
  end_time: string
  session_id?: number
  entry_count: number
}

type SpectatorSubsession = {
  event_types: number[]
  success: boolean
  subsession_ids: number[]
}

export { RaceGuide, SeasonList, Series, SpectatorSubsession }
