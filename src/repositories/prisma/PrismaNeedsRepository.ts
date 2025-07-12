import { Needs } from "@prisma/client";
import { CreateNeedsAttributes, NeedsRepository } from "../NeedsRepository";
import { prisma } from "../../database";

export class PrismaNeedsRepository implements NeedsRepository {
    find(): Promise<Needs[]> {
        return prisma.needs.findMany()
    }

    findById (id: number):  Promise<Needs | null> {
        return prisma.needs.findUnique ({
            where: {id}
        })
    }

    create(attributes: CreateNeedsAttributes): Promise <Needs> {
        return prisma.needs.create({ data: attributes})
    }

    updateById(id: number, attributes: Partial<CreateNeedsAttributes>): Promise <Needs | null> {
        return prisma.needs.update ({
            where: {id},
            data: attributes
        })
    }

    deleteById(id: number): Promise<Needs | null> {
        return prisma.needs.delete({ where: {id}})
    }
}