type CarInClass = {
  car_dirpath: string
  car_id: number
  rain_enabled: boolean
  retired: boolean
}

type CarClass = {
  car_class_id: number
  cars_in_class: CarInClass[]
  cust_id: number
  name: string
  rain_enabled: boolean
  relative_speed: number
  short_name: string
}

export { CarClass }
