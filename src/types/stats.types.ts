type BestData = {
  track: TrackData
  event_type: string
  best_lap_time: number
  subsession_id: number
  end_time: string
  season_year: number
  season_quarter: number
}

type CarData = {
  car_id: number
  car_name: string
}

type CareerData = {
  category_id: number
  category: string
  starts: number
  wins: number
  top5: number
  poles: number
  avg_start_position: number
  avg_finish_position: number
  laps: number
  laps_led: number
  avg_incidents: number
  avg_points: number
  win_percentage: number
  top5_percentage: number
  laps_led_percentage: number
  total_club_points: number
}

type ChunkInfo = {
  chunk_size: number
  num_chunks: number
  rows: number
  base_download_url: string
  chunk_file_names: string[]
}

type DivisionData = {
  division: number
  projected: boolean
  event_type: number
  success: boolean
  season_id: number
}

type Livery = {
  car_id: number
  pattern: number
  color1: string
  color2: string
  color3: string
}

type MemberBests = {
  cars_driven: CarData[]
  bests: BestData[]
  cust_id: number
  car_id: number
}

type MemberCareer = {
  stats: CareerData[]
  cust_id: number
}

type MemberRecap = {
  year: number
  stats: RecapStats
  success: boolean
  season: number | null
  cust_id: number
}

type MemberSummary = {
  this_year: {
    num_official_sessions: number
    num_league_sessions: number
    num_official_wins: number
    num_league_wins: number
  }
  cust_id: number
}

type MemberYearlySummary = {
  stats: Stat[]
  cust_id: number
}

type Race = {
  season_id: number
  series_id: number
  series_name: string
  car_id: number
  car_class_id: number
  livery: Livery
  license_level: number
  session_start_time: string
  winner_group_id: number
  winner_name: string
  winner_helmet: WinnerHelmet
  winner_license_level: number
  start_position: number
  finish_position: number
  qualifying_time: number
  laps: number
  laps_led: number
  incidents: number
  club_points: number
  points: number
  strength_of_field: number
  subsession_id: number
  old_sub_level: number
  new_sub_level: number
  oldi_rating: number
  newi_rating: number
  track: TrackData
}

type RecentRaces = {
  races: Race[]
  cust_id: number
}

type RecapStats = {
  starts: number
  wins: number
  top5: number
  avg_start_position: number
  avg_finish_position: number
  laps: number
  laps_led: number
  favorite_car: SeasonFavoriteCar
  favorite_track: SeasonFavoriteTrack
}

type SeasonFavoriteCar = {
  car_id: number
  car_name: string
  car_image: string
}

type SeasonFavoriteTrack = {
  track_id: number
  track_name: string
  config_name: string
  track_logo: string
}

type SeasonResults = {
  success: boolean
  season_id: number
  season_name: string
  season_short_name: string
  series_id: number
  series_name: string
  car_class_id: number
  race_week_num: number
  division: number
  club_id: number
  customer_rank: number
  chunk_info: ChunkInfo
  last_updated: string
}

type SeasonStandings = {
  success: boolean
  season_id: number
  season_name: string
  season_short_name: string
  series_id: number
  series_name: string
  car_class_id: number
  race_week_num: number
  division: number
  club_id: number
  customer_rank: number
  chunk_info: ChunkInfo
  last_updated: string
}

type Stat = {
  category_id: number
  category: string
  starts: number
  wins: number
  top5: number
  poles: number
  avg_start_position: number
  avg_finish_position: number
  laps: number
  laps_led: number
  avg_incidents: number
  avg_points: number
  win_percentage: number
  top5_percentage: number
  laps_led_percentage: number
  total_club_points: number
  year: number
}

type TrackData = {
  track_id: number
  track_name: string
  config_name?: string
}

type WinnerHelmet = {
  pattern: number
  color1: string
  color2: string
  color3: string
  face_type: number
  helmet_type: number
}
export {
  DivisionData,
  MemberBests,
  MemberCareer,
  MemberRecap,
  MemberSummary,
  MemberYearlySummary,
  RecentRaces,
  SeasonResults,
  SeasonStandings,
}
