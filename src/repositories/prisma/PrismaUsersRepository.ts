import { Account } from "@prisma/client"
import { prisma } from "../../database"
import { AccountRepository, CreateAccountAttributes } from "../UsersRepository"

export class PrismaAccountRepository implements AccountRepository {
    find(): Promise<Account[]> {
        return prisma.account.findMany()
    }

    findById (id: number):  Promise<Account | null> {
        return prisma.account.findUnique ({
            where: {id}
        })
    }

    create(attributes: CreateAccountAttributes): Promise <Account> {
        return prisma.account.create({ data: attributes})
    }

    updateById(id: number, attributes: Partial<CreateAccountAttributes>): Promise <Account | null> {
        return prisma.account.update ({
            where: {id},
            data: attributes
        })
    }

    deleteById(id: number): Promise<Account | null> {
        return prisma.account.delete({ where: {id}})
    }
}