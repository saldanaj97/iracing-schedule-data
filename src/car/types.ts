type Car = {
  car_class_id: number
  cars_in_class: CarDetails[]
  cust_id: number
  name: string
  rain_enabled: boolean
  relative_speed: number
  short_name: string
}

type CarDetails = {
  car_dirpath: string
  car_id: number
  rain_enabled: boolean
  retired: boolean
}

type CarType = {
  car_type: string
}

type CarRestriction = {
  car_id: number
  max_dry_tire_sets: number
  max_pct_fuel_fill: number
  power_adjust_pct: number
  weight_penalty_kg: number
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

export { Car }
