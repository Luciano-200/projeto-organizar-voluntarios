import { Volunteer } from "@prisma/client"

export type Regions = "INTERNATIONAL"|"NORTH"|"NORTHEAST"|"SOUTH"|"SOUTHEAST"|"CENTRAL_WEST"
export type Times = "MORNING"|"AFTERNOON"|"EVENING"|"MORNING_AFTERNOON"|"MORNING_EVENING"|"AFTERNOON_EVENING"|"FULL_DAY"
export type VolunteerExpertises = "NONE"|"DOCTOR"|"NURSE"|"FIREFIGHTER"|"PSYCHOLOGIST"|"POLICE_OFFICER"|"LIFEGUARD"|"ENGINEER"|"VETERINARIAN"
export type VolunteerStatus = "CONTACTED"|"SELECTED"|"CLOSED"

export interface CreateVolunteerAttributes {
    accountId: number
    region: Regions
    availabilityTime: Times
    availability?: string
    equipment?: string
    expertise?: VolunteerExpertises
    status?: VolunteerStatus
    phoneNumber?: string
}

export interface VolunteerWhereParams {
    status?: VolunteerStatus
    availabilityTime?: Times
    region?: Regions
    expertise?: VolunteerExpertises
}

export interface FindVolunteerParams {
  where?: VolunteerWhereParams
  sortBy?: "region" | "status" | "availabilityTime" | "expertise"
  order?: "asc" | "desc"
  limit?: number
  offset?: number
}

export interface VolunteerRepository {
    find: (params: FindVolunteerParams) => Promise<Volunteer[]>
    findById: (id: number) => Promise<Volunteer | null>
    count: (where: VolunteerWhereParams) => Promise <number>
    create: (attributes: CreateVolunteerAttributes) => Promise<Volunteer>
    updateById: (id: number, attributes: Partial<CreateVolunteerAttributes>) => Promise<Volunteer | null>
    deleteById: (id: number) => Promise<Volunteer | null>
}