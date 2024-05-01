type CarDetail = {
  car_id: number
  car_rules: any[]
  detail_copy: string
  detail_screen_shot_images: string
  detail_techspecs_copy: string
  folder: string
  gallery_images: string
  gallery_prefix: string | null
  group_image: string | null
  group_name: string | null
  large_image: string
  logo: string
  small_image: string
  sponsor_logo: string | null
  template_path: string
}

type CarDetails = {
  [key: string]: CarDetail
}

type CarInfo = {
  ai_enabled: boolean
  allow_number_colors: boolean
  allow_number_font: boolean
  allow_sponsor1: boolean
  allow_sponsor2: boolean
  allow_wheel_color: boolean
  award_exempt: boolean
  car_dirpath: string
  car_id: number
  car_name: string
  car_name_abbreviated: string
  car_types: { car_type: string }[]
  car_weight: number
  categories: string[]
  created: string // Assuming a string format for dates
  first_sale: string // Assuming a string format for dates
  forum_url: string
  free_with_subscription: boolean
  has_headlights: boolean
  has_multiple_dry_tire_types: boolean
  has_rain_capable_tire_types: boolean
  hp: number
  is_ps_purchasable: boolean
  max_power_adjust_pct: number
  max_weight_penalty_kg: number
  min_power_adjust_pct: number
  package_id: number
  patterns: number
  price: number
  price_display: string
  rain_enabled: boolean
  retired: boolean
  search_filters: string
  sku: number
}

export { CarDetails, CarInfo }
