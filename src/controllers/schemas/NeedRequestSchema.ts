import { z } from "zod";

const Categorys = z.enum([
    "FOOD",
  "CLOTHING_AND_FOOTWEAR",
  "PERSONAL_HYGIENE",
  "CLEANING_SUPPLIES",
  "BEDDING",
  "FURNITURE",
  "MONEY",
  "SPECIALIST",
  "VOLUNTEER"
])

export const CreateNeedRequestSchema = z.object({
    needs: z.string(),
    categoryOfNeed: Categorys.optional()
})

export const UpdateNeedRequestSchema = z.object({
    needs: z.string().optional(),
    categoryOfNeed: Categorys.optional()
})