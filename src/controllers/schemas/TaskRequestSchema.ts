import { z } from "zod";

const TaskStatus = z.enum([
    "SCHEDULED",
  "STARTED",
  "COMPLETED"
])

export const CreateTaskRequestSchema = z.object({
    objectives: z.string(),
    details: z.string().optional(),
    equipments: z.string().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    status: TaskStatus.optional()
})

export const UpdateTaskRequestSchema = z.object({
    objectives: z.string().optional(),
    details: z.string().optional(),
    equipments: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    status: TaskStatus.optional()
})

export const AddVolunteerRequestSchema = z.object({
    volunteerId: z.number()
})