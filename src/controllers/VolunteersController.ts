import { Handler } from "express"
import { CreateVolunteerRequestSchema, GetVolunteerRequestSchema, UpdateVolunteerRequestSchema } from "./schemas/VolunteerRequestSchema"
import { HttpError, to } from "../errors/HttpError"
import { VolunteerRepository, VolunteerWhereParams } from "../repositories/VolunteersRepository"

export class VolunteersController {
  constructor (private readonly volunteersRepository: VolunteerRepository) {}

  index: Handler = async (req, res, next) => {
      const query = GetVolunteerRequestSchema.parse(req.query)
      const { page = "1", pageSize = "10", status, availabilityTime, expertise, region, sortBy = "status", order = "asc" } = query

      const limit = Number(pageSize)
      const offset = (Number(page) - 1) * limit

      const where: VolunteerWhereParams = {}

      if (status) where.status = status
      if (availabilityTime) where.availabilityTime = availabilityTime
      if (region) where.region = region
      if (expertise) where.expertise = expertise

      const [error, volunteers] = await to (this.volunteersRepository.find({where, sortBy, order, limit, offset}))

      const [err, total] = await to (this.volunteersRepository.count(where))

      if (total !== undefined && volunteers !== undefined) res.json({
        data: volunteers,
        meta: {
          page: Number(page),
          pageSize: limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      })
  }

  create: Handler = async (req, res, next) => {

      const body = CreateVolunteerRequestSchema.parse(req.body)
      const [err, newVolunteer] = await to (this.volunteersRepository.create(body))
      res.status(201).json(newVolunteer)
  }

  show: Handler = async (req, res, next) => {

        const [err, voluntario] = await to (this.volunteersRepository.findById(Number(req.params.id)));
  
         if (!voluntario || voluntario === undefined) {throw new HttpError(404, "voluntario nao encontrado")}
         else {res.json(voluntario)}

    }

  update: Handler = async (req, res, next) => {

        const id = Number(req.params.id)
        const body = UpdateVolunteerRequestSchema.parse(req.body)
  
        const [err, updatedVolunteer] = await to (this.volunteersRepository.updateById(id, body))
        if (!updatedVolunteer) throw new HttpError(404, "voluntario nao encontrado")
  
        res.json(updatedVolunteer)

    }

  delete: Handler = async (req, res, next) => {
      const id = Number(req.params.id)

      const [err, deletedVolunteer] = await to (this.volunteersRepository.deleteById(id))
      if (!deletedVolunteer) throw new HttpError(404, "voluntario nao encontrado")

      res.json(deletedVolunteer)
  }  
}