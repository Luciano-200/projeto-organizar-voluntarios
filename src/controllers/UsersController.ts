import { Handler } from "express";
import { HttpError, to } from "../errors/HttpError";
import { CreateUserRequestSchema, UpdateUserRequestSchema } from "./schemas/UserRequestSchema";
import { AccountRepository } from "../repositories/UsersRepository";

export class UsersController {
  constructor (private readonly usersRepository: AccountRepository) {}
  index: Handler = async (req, res, next) => {

    const [err, users] = await to(this.usersRepository.find())
    res.json(users)

  }

  create: Handler = async (req, res, next) => {
    const body = CreateUserRequestSchema.parse(req.body)
    const [err, newUser] = await to(this.usersRepository.create( body ))
    res.status(201).json(newUser)
  }

  show: Handler = async (req, res, next) => {

    const [err, user] = await to(this.usersRepository.findById(Number(req.params.id)))

    if (!user) throw new HttpError(404, "usuario nao encontrado")

    res.json(user)
  }

  update: Handler = async (req, res, next) => {
    const id = Number(req.params.id)
    const body = UpdateUserRequestSchema.parse(req.body)

    const [err, updatedUser] = await to(this.usersRepository.updateById( id, body ))
    if (!updatedUser) throw new HttpError(404, "Usuario nao encontrado")

    res.json(updatedUser)
  }

  delete: Handler = async (req, res, next) => {
    const id = Number(req.params.id)

    const [err, deletedUser] = await to(this.usersRepository.deleteById(id))
    if (!deletedUser) throw new HttpError(404, "Usuario nao encontrado")

    res.json(deletedUser)
  }
}