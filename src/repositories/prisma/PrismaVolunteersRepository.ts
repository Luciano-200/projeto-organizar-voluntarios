import { Volunteer } from "@prisma/client"
import { CreateVolunteerAttributes, FindVolunteerParams, VolunteerRepository, VolunteerWhereParams } from "../VolunteersRepository"
import { prisma } from "../../database"

export class PrismaVolunteerRepository implements VolunteerRepository {
    async find(params: FindVolunteerParams): Promise<Volunteer[]> {
        return prisma.volunteer.findMany({
            where: {
                status: params.where?.status,
                expertise: params.where?.expertise,
                availabilityTime: params.where?.availabilityTime,
                region: params.where?.region
            },
            orderBy: { [params.sortBy ?? "status"]: params.order },
            skip: params.offset,
            take: params.limit,
            include: {
                tasks: true
            }
        })
    }

    async findById(id: number): Promise<Volunteer | null> {
        return prisma.volunteer.findUnique({
            where: { id },
            include: { tasks: true }
        })
    }

    async count(where: VolunteerWhereParams): Promise<number> {
        return prisma.volunteer.count({
            where: {
                status: where?.status,
                expertise: where?.expertise,
                availabilityTime: where?.availabilityTime,
                region: where?.region
            }
        })
    }

    async create(attributes: CreateVolunteerAttributes): Promise<Volunteer> {
        return prisma.volunteer.create({ data: attributes })
    }

    async updateById(id: number, attributes: Partial<CreateVolunteerAttributes>): Promise<Volunteer | null> {
        return prisma.volunteer.update({
            where: { id },
            data: attributes
        })
    }

    async deleteById(id: number): Promise<Volunteer | null> {
        return prisma.volunteer.delete({ where: { id } })
    }
}