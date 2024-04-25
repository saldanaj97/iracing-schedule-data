type Owner = {
  cust_id: number
  display_name: string
  helmet: {
    pattern: number
    color1: string
    color2: string
    color3: string
    face_type: number
    helmet_type: number
  }
  owner: boolean
  admin: boolean
}

type TeamInfo = {
  team_id: number
  owner_id: number
  team_name: string
  created: string
  hidden: boolean
  about: string
  url: string
  roster_count: number
  recruiting: boolean
  private_wall: boolean
  is_default: boolean
  is_owner: boolean
  is_admin: boolean
  suit: {
    pattern: number
    color1: string
    color2: string
    color3: string
  }
  owner: Owner
  tags: {
    categorized: string[]
    not_categorized: string[]
  }
  team_applications: any[]
  pending_requests: any[]
  is_member: boolean
  is_applicant: boolean
  is_invite: boolean
  is_ignored: boolean
  roster: TeamMember[]
}

type TeamMember = {
  cust_id: number
  display_name: string
  helmet: {
    pattern: number
    color1: string
    color2: string
    color3: string
    face_type: number
    helmet_type: number
  }
  owner: boolean
  admin: boolean
}

export { TeamInfo }
