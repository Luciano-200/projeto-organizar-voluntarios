import { Account } from "@prisma/client"
import { AuthRepository } from "../AuthRepository"
import { prisma } from "../../database"

export class PrismaAuthRepository implements AuthRepository {
    findById (id: number):  Promise<Account | null> {
        return prisma.account.findUnique ({
            where: {id}
        })
    }

    login (email: string): Promise<Account | null> {
        return prisma.account.findUnique({
            where: {email}
        })
    }
}