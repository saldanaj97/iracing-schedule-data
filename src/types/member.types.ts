type AccountInfo = {
  ir_dollars: number
  ir_credits: number
  status: string
  country_rules: null | any
}

type Award = {
  member_award_id: number
  award_id: number
  achievement: boolean
  award_count?: number
  award_date?: string
  award_order: number
  awarded_description?: string
  description: string
  group_name: string
  has_pdf: boolean
  icon_url_large: string
  icon_url_small: string
  icon_url_unawarded: string
  name: string
  viewed?: boolean
  weight: number
}

type AwardResponse = {
  type: string
  data: {
    success: boolean
    cust_id: number
    award_count: number
  }
  data_url: string
}

type Activity = {
  recent_30days_count: number
  prev_30days_count: number
  consecutive_weeks: number
  most_consecutive_weeks: number
}

type ChartData = {
  blackout: boolean
  category_id: 1 | 2 | 3 | 4 | 5
  chart_type: 1 | 2 | 3
  data: {
    when: string
    value: number
  }[]
  success: boolean
  cust_id: number
}

type FollowCounts = {
  followers: number
  follows: number
}

type HelmetInfo = {
  pattern: number
  color1: string
  color2: string
  color3: string
  face_type: number
  helmet_type: number
}

type License = {
  category_id: number
  category: string
  category_name: string
  license_level: number
  safety_rating: number
  cpi: number
  irating: number
  tt_rating: number
  color: string
  group_name: string
  group_id: number
  pro_promotable: boolean
  seq: number
}

type LicenseInfo = {
  category_id: number
  category: string
  category_name: string
  license_level: number
  safety_rating: number
  cpi: number
  irating: number
  tt_rating: number
  mpr_num_races: number
  color: string
  group_name: string
  group_id: number
  pro_promotable: boolean
  seq: number
  mpr_num_tts: number
}

type MemberData = {
  success: boolean
  cust_ids: number[]
  members: MemberInfo[]
}

type MemberInfo = {
  cust_id: number
  display_name: string
  helmet: HelmetInfo
  last_login: string
  member_since: string
  club_id: number
  club_name: string
  ai: boolean
  licenses?: License[]
}

type MemberProfile = {
  recent_awards: Award[]
  activity: Activity
  image_url: string
  profile: ProfileField[]
  member_info: MemberInfo
  field_defs: ProfileField[]
  license_history: License[]
  is_generic_image: boolean
  follow_counts: FollowCounts
  success: boolean
  disabled: boolean
  recent_events: RecentEvent[]
}

type ProfileField = {
  field_id: number
  name: string
  value: string | null
  editable: boolean
  label: string
  section: string
  row_order: number
  column: number
  number_of_lines: number
}

type RecentEvent = {
  event_type: string
  subsession_id: number
  start_time: string
  event_id: number
  event_name: string
  simsession_type: number
  starting_position: number
  finish_position: number
  best_lap_time: number
  percent_rank: number
  car_id: number
  car_name: string
  logo_url: string | null
  track: {
    config_name: string
    track_id: number
    track_name: string
  }
}

type PackageContent = {
  package_id: number
  content_ids: number[]
}

type ParticipationCreditData = {
  cust_id: number
  season_id: number
  series_id: number
  series_name: string
  license_group: number
  license_group_name: string
  participation_credits: number
  min_weeks: number
  weeks: number
  earned_credits: number
  total_credits: number
}

type PersonalInfo = {
  cust_id: number
  email: string
  username: string
  display_name: string
  first_name: string
  last_name: string
  on_car_name: string
  member_since: string
  last_test_track: number
  last_test_car: number
  last_season: number
  flags: number
  club_id: number
  club_name: string
  connection_type: string
  download_server: string
  last_login: string
  read_comp_rules: string
  account: AccountInfo
  helmet: HelmetInfo
  suit: SuitInfo
  licenses: {
    oval: LicenseInfo
    sports_car: LicenseInfo
    formula_car: LicenseInfo
    dirt_oval: LicenseInfo
    dirt_road: LicenseInfo
  }
  car_packages: PackageContent[]
  track_packages: PackageContent[]
  other_owned_packages: number[]
  dev: boolean
  alpha_tester: boolean
  rain_tester: boolean
  broadcaster: boolean
  restrictions: Record<string, any>
  has_read_comp_rules: boolean
  flags_hex: string
  hundred_pct_club: boolean
  twenty_pct_discount: boolean
  race_official: boolean
  ai: boolean
  bypass_hosted_password: boolean
  read_tc: string
  read_pp: string
  has_read_tc: boolean
  has_read_pp: boolean
}

type SuitInfo = {
  pattern: number
  color1: string
  color2: string
  color3: string
  body_type: number
}

export { Award, AwardResponse, ChartData, MemberData, MemberProfile, ParticipationCreditData, PersonalInfo }
