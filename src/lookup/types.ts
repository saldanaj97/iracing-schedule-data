type Club = {
  club_id: number
  club_name: string
  season_year: number
  season_quarter: number
  region: string
}

type Country = {
  country_code: string
  country_name: string
}

type Driver = {
  cust_id: number
  display_name: string
  helmet: Helmet
  profile_disabled: boolean
}

type Helmet = {
  pattern: number
  color1: string
  color2: string
  color3: string
  face_type: number
  helmet_type: number
}

export { Club, Country, Driver }
