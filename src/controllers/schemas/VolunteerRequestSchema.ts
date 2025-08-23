import { z } from "zod";

const Regions = z.enum([
    "INTERNATIONAL",
  "NORTH",
  "NORTHEAST",
  "SOUTH",
  "SOUTHEAST",
  "CENTRAL_WEST"
])

const Times = z.enum([
    "MORNING",
  "AFTERNOON",
  "EVENING",
  "MORNING_AFTERNOON",
  "MORNING_EVENING",
  "AFTERNOON_EVENING",
  "FULL_DAY"
])

const VolunteerExpertises = z.enum([
    "NONE",
  "DOCTOR",
  "NURSE",
  "FIREFIGHTER",
  "PSYCHOLOGIST",
  "POLICE_OFFICER",
  "LIFEGUARD",
  "ENGINEER",
  "VETERINARIAN"
])

const VolunteerStatus = z.enum([
    "CONTACTED",
  "SELECTED",
  "CLOSED"
])

export const CreateVolunteerRequestSchema = z.object({
    accountId: z.number(),
    region: Regions,
    availabilityTime: Times,
    availability: z.string().optional(),
    equipment: z.string().optional(),
    expertise: VolunteerExpertises.optional(),
    status: VolunteerStatus.optional(),
    phoneNumber: z.string().optional()
})

export const UpdateVolunteerRequestSchema = z.object({
    region: Regions.optional(),
    availabilityTime: Times.optional(),
    availability: z.string().optional(),
    equipment: z.string().optional(),
    expertise: VolunteerExpertises.optional(),
    status: VolunteerStatus.optional(),
    phoneNumber: z.string().optional()
})

export const GetVolunteerRequestSchema = z.object({
    page: z.string().optional(),
    pageSize: z.string().optional(),
    status: VolunteerStatus.optional(),
    expertise: VolunteerExpertises.optional(),
    availabilityTime: Times.optional(),
    region: Regions.optional(),
    sortBy: z.enum(["availabilityTime", "status", "expertise", "region"]).optional(),
    order: z.enum(["asc", "desc"]).optional()
})