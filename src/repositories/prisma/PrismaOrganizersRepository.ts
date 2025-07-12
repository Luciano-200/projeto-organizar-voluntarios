import { Organizer } from "@prisma/client"
import { prisma } from "../../database"
import { CreateOrganizerAttributes, OrganizerRepository } from "../OrganizersRepository"

export class PrismaOrganizerRepository implements OrganizerRepository {
    find(): Promise<Organizer[]> {
        return prisma.organizer.findMany({ include: {account: true}})
    }

    findById (id: number):  Promise<Organizer | null> {
        return prisma.organizer.findUnique ({
            where: {id}, include: {account: true}
        })
    }

    create(attributes: CreateOrganizerAttributes): Promise <Organizer> {
        return prisma.organizer.create({ data: attributes})
    }


    deleteById(id: number): Promise<Organizer | null> {
        return prisma.organizer.delete({ where: {id}})
    }
}