type Track = {
  ai_enabled: boolean
  allow_pitlane_collisions: boolean
  allow_rolling_start: boolean
  allow_standing_start: boolean
  award_exempt: boolean
  category: string
  category_id: number
  closes: string
  config_name: string
  corners_per_lap: number
  created: string
  first_sale: string
  free_with_subscription: boolean
  fully_lit: boolean
  grid_stalls: number
  has_opt_path: boolean
  has_short_parade_lap: boolean
  has_start_zone: boolean
  has_svg_map: boolean
  is_dirt: boolean
  is_oval: boolean
  is_ps_purchasable: boolean
  lap_scoring: number
  latitude: number
  location: string
  longitude: number
  max_cars: number
  night_lighting: boolean
  nominal_lap_time: number
  number_pitstalls: number
  opens: string
  package_id: number
  pit_road_speed_limit: number
  price: number
  price_display: string
  priority: number
  purchasable: boolean
  qualify_laps: number
  rain_enabled: boolean
  restart_on_left: boolean
  retired: boolean
  search_filters: string
  site_url: string
  sku: number
  solo_laps: number
  start_on_left: boolean
  supports_grip_compound: boolean
  tech_track: boolean
  time_zone: string
  track_config_length: number
  track_dirpath: string
  track_id: number
  track_name: string
  track_types: TrackType[]
}

type TrackType = {
  track_type: string
}

type TrackAssets = {
  coordinates: string
  detail_copy: string
  detail_techspecs_copy: string | null
  detail_video: string | null
  folder: string
  gallery_images: string
  gallery_prefix: string
  large_image: string
  logo: string
  north: string
  num_svg_images: number
  small_image: string
  track_id: number
  track_map: string
  track_map_layers: {
    background: string
    inactive: string
    active: string
    pitroad: string
    "start-finish": string
    turns: string
  }
}

export { Track, TrackAssets }
