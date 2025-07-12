import { Organizer } from "@prisma/client"

export interface CreateOrganizerAttributes {
    accountId: number
}

export interface OrganizerRepository {
    find: () => Promise<Organizer[]>
    findById: (id: number) => Promise<Organizer | null>
    create: (attributes: CreateOrganizerAttributes) => Promise<Organizer>
    deleteById: (id: number) => Promise<Organizer | null>
}