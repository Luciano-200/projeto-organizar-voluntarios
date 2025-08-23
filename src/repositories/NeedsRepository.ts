import { Needs } from "@prisma/client";

export type Categorys = "FOOD"|"CLOTHING_AND_FOOTWEAR"|"PERSONAL_HYGIENE"|"CLEANING_SUPPLIES"|"BEDDING"|"FURNITURE"|"MONEY"|"SPECIALIST"|"VOLUNTEER"

export interface CreateNeedsAttributes {
    needs: string
    categoryOfNeed?: Categorys
}

export interface NeedsRepository {
    find: () => Promise<Needs[]>
    findById: (id: number) => Promise<Needs | null>
    create: (attributes: CreateNeedsAttributes) => Promise<Needs>
    updateById: (id: number, attributes: Partial<CreateNeedsAttributes>) => Promise<Needs | null>
    deleteById: (id: number) => Promise<Needs | null>
}