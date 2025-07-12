import { Tasks } from "@prisma/client"
import { prisma } from "../../database"
import { CreateTaskAttributes, TaskRepository } from "../TasksRepository"

export class PrismaTasksRepository implements TaskRepository {
  find(): Promise<Tasks[]> {
    return prisma.tasks.findMany({ include: {volunteers: true}})
  }

  findById(id: number): Promise<Tasks | null> {
    return prisma.tasks.findUnique({
      where: { id },
      include: {
        volunteers: true
      }
    })
  }

  create(attributes: CreateTaskAttributes): Promise<Tasks> {
    return prisma.tasks.create({ data: attributes })
  }

  updateById(id: number, attributes: Partial<CreateTaskAttributes>): Promise<Tasks | null> {
    return prisma.tasks.update({
      where: { id },
      data: attributes
    })
  }

  deleteById(id: number): Promise<Tasks | null> {
    return prisma.tasks.delete({ where: { id } })
  }

  addVolunteer(tasksId: number, volunteerId: number): Promise<Tasks> {
    return prisma.tasks.update({
      where: { id: tasksId },
      data: {
        volunteers: { connect: { id: volunteerId } }
      },
      include: { volunteers: true }
    })
  }

  removeVolunteer(tasksId: number, volunteerId: number): Promise<Tasks> {
    return prisma.tasks.update({
      where: { id: tasksId },
      data: {
        volunteers: { disconnect: { id: volunteerId } }
      },
      include: { volunteers: true }
    })
  }
}