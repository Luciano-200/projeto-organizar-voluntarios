import { Account } from "@prisma/client"

export interface CreateAccountAttributes {
    name: string
    email: string
    password: string
}

export interface AccountRepository {
    find: () => Promise<Account[]>
    findById: (id: number) => Promise<Account | null>
    create: (attributes: CreateAccountAttributes) => Promise<Account>
    updateById: (id: number, attributes: Partial<CreateAccountAttributes>) => Promise<Account | null>
    deleteById: (id: number) => Promise<Account | null>
}