import { Handler } from "express"
import { HttpError, to } from "../errors/HttpError"
import { CreateNeedRequestSchema, UpdateNeedRequestSchema } from "./schemas/NeedRequestSchema"
import { NeedsRepository } from "../repositories/NeedsRepository"


export class NeedsController {
  constructor (private readonly needsRepository: NeedsRepository) {}

    index: Handler = async (req, res, next) => {
          const [err, needs] = await to (this.needsRepository.find())
          res.json(needs)
      }
    create: Handler = async (req, res, next) => {
          const body = CreateNeedRequestSchema.parse(req.body)
          const [err, newNeed] = await to (this.needsRepository.create( body ))
          res.status(201).json(newNeed)
      }
    show: Handler = async (req, res, next) => {
          const [err, need] = await to (this.needsRepository.findById(Number(req.params.id)))
    
          if (!need) throw new HttpError(404, "item nao encontrado")
    
          res.json(need)
      }
    update: Handler = async (req, res, next) => {
          const id = Number(req.params.id)
          const body = UpdateNeedRequestSchema.parse(req.body)
    
          const [err, updatedNeed] = await to (this.needsRepository.updateById(id, body))
          if (!updatedNeed) throw new HttpError(404, "item nao encontrado")
    
          res.json(updatedNeed)
      }
    delete: Handler = async (req, res, next) => {
      const id = Number(req.params.id)

      const [err, deletedNeed] = await to (this.needsRepository.deleteById(id))
      if (!deletedNeed) throw new HttpError(404, "item nao encontrado")

      res.json(deletedNeed)
  }
}