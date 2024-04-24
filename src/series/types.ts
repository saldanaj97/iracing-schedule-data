type LicenseRange = {
  license_group: number
  min_license_level: number
  max_license_level: number
  group_name: string
}

type SeriesAssets = {
  [key: string]: {
    large_image: string | null
    logo: string
    series_copy: string
    series_id: number
    small_image: string | null
  }
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

type Track = {
  track_id: number
  track_name: string
  config_name?: string
}

type License = {
  parent_id: number
  license_group: number
  min_license_level: number
  max_license_level: number
  group_name: string
}

type CarClass = {
  car_class_id: number
  short_name: string
  name: string
  relative_speed: number
}

type PastSeason = {
  season_id: number
  series_id: number
  season_name: string
  season_short_name: string
  season_year: number
  season_quarter: number
  active: boolean
  official: boolean
  driver_changes: boolean
  fixed_setup: boolean
  license_group: number
  has_supersessions: boolean
  license_group_types: { license_group_type: number }[]
  car_classes: CarClass[]
  race_weeks: {
    season_id: number
    race_week_num: number
    track: Track
  }[]
}

type PastSeries = {
  series_id: number
  series_name: string
  series_short_name: string
  category_id: number
  category: string
  active: boolean
  official: boolean
  fixed_setup: boolean
  logo: string | null
  license_group: number
  license_group_types: { license_group_type: number }[]
  allowed_licenses: License[]
  seasons: PastSeason[]
}

export { PastSeries, Series, SeriesAssets }
