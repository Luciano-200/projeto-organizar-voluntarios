import { Account } from "@prisma/client";

export interface AuthRepository {
    findById: (id: number) => Promise<Account | null>
    login: (email: string) => Promise<Account | null>
}