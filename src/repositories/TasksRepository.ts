import { Tasks } from "@prisma/client"

export type TaskStatus = "Marcada"|"Iniciada"|"Terminada"

export interface CreateTaskAttributes {
    objectives: string
    details?: string
    equipments?: string
    startDate: Date
    endDate?: Date
    status?: TaskStatus
}

export interface TaskRepository {
  find: () => Promise<Tasks[]>
  findById: (id: number) => Promise<Tasks | null>
  create: (attributes: CreateTaskAttributes) => Promise<Tasks>
  updateById: (id: number, attributes: Partial<CreateTaskAttributes>) => Promise<Tasks | null>
  deleteById: (id: number) => Promise<Tasks | null>
  addVolunteer: (tasksId: number, volunteerId: number) => Promise<Tasks>
  removeVolunteer: (tasksId: number, volunteerId: number) => Promise<Tasks>
}