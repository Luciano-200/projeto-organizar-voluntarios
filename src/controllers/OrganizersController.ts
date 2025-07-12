import { Handler } from "express"
import { HttpError, to } from "../errors/HttpError"
import { OrganizerRepository } from "../repositories/OrganizersRepository"
import { CreateOrganizerRequestSchema } from "./schemas/OrganizerRequestSchema"

export class AdminController {
  constructor (private readonly organizerRepository: OrganizerRepository) {}

  index: Handler = async (req, res, next) => {
      const [err, admin] = await to (this.organizerRepository.find())
      res.json(admin)
  }

  create: Handler = async (req, res, next) => {
        const body = CreateOrganizerRequestSchema.parse(req.body)
        const [err, newOrganizer] = await to (this.organizerRepository.create(body))

        res.status(201).json(newOrganizer)
    }

  show: Handler = async (req, res, next) => {
        const [err, admin] = await to (this.organizerRepository.findById(Number(req.params.id)))
  
        if (!admin) throw new HttpError(404, "organizador nao encontrado")
  
        res.json(admin)
    }
   
   delete: Handler = async (req, res, next) => {
      const id = Number(req.params.id)

      const [err, deletedAdmin] = await to (this.organizerRepository.deleteById(id))
      if (!deletedAdmin) throw new HttpError(404, "Organizador nao encontrado")

      res.json(deletedAdmin)
  } 
}