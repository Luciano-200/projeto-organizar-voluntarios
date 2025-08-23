const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET!

import { Handler } from "express";
import { HttpError, to } from "../errors/HttpError";
import { AuthRepository } from "../repositories/AuthRepository";

export class AuthController {
    constructor (private readonly authRepository: AuthRepository) {}

    login: Handler = async (req, res, next) => {
            const {email, password} = req.body
            const [err, user] = await to (this.authRepository.login(email))

            if (!user || user.password !== password || user.email !== email) throw new HttpError(404, "dados incorretos")    

            const payload = {id: user.id, email: user.email, admin: user.user}
            const token = jwt.sign(payload, jwtSecret, {expiresIn: '1d'})
            res.json({token})
    }

    ensureAuth: Handler = async (req, res, next) => {
           const authHeader = req.headers.authorization
           if (!authHeader) throw new HttpError(404, "usuario nao permitido") 
           
           const token = authHeader.split(' ')[1]
           
            const {id} = jwt.verify(token, jwtSecret)
            
            const [err, user] = await to (this.authRepository.findById(
            id
            ))

            if (!user) throw new HttpError(404, "usuario nao encontrado")
  
            next()

    }

    ensureAdmin: Handler = async (req, res, next) => {
           const authHeader = req.headers.authorization
           if (!authHeader) throw new HttpError(404, "usuario nao permitido") 
           
           const token = authHeader.split(' ')[1]
           
            const {admin} = jwt.verify(token, jwtSecret)

            if (admin !== "Admin") throw new HttpError(404, "usuario nao permitido")

            next()

    }
}