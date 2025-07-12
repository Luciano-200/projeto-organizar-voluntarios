import { UsersController } from "./controllers/UsersController"
import { NeedsController } from "./controllers/NeedsController"
import { TasksController } from "./controllers/TasksController"
import { AuthController } from "./controllers/AuthController"
import { VolunteersController } from "./controllers/VolunteersController"
import { AdminController } from "./controllers/OrganizersController"
import { PrismaNeedsRepository } from "./repositories/prisma/PrismaNeedsRepository"
import { PrismaAccountRepository } from "./repositories/prisma/PrismaUsersRepository"
import { PrismaOrganizerRepository } from "./repositories/prisma/PrismaOrganizersRepository"
import { PrismaVolunteerRepository } from "./repositories/prisma/PrismaVolunteersRepository"
import { PrismaTasksRepository } from "./repositories/prisma/PrismaTasksRepository"
import { PrismaAuthRepository } from "./repositories/prisma/PrismaAuthRepository"

export const needsRepository = new PrismaNeedsRepository
export const accountRepository = new PrismaAccountRepository
export const adminRepository = new PrismaOrganizerRepository
export const volunteerRepository = new PrismaVolunteerRepository
export const tasksRepository = new PrismaTasksRepository
export const authRepository = new PrismaAuthRepository


export const authController = new AuthController(authRepository)

export const adminController = new AdminController(adminRepository)
export const usersController = new UsersController(accountRepository)
export const needsController = new NeedsController(needsRepository)
export const tasksController = new TasksController(tasksRepository)
export const volunteersController = new VolunteersController(volunteerRepository)
