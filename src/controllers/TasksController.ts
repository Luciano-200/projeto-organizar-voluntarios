import { Handler } from "express"
import { HttpError, to } from "../errors/HttpError"
import { AddVolunteerRequestSchema, CreateTaskRequestSchema, UpdateTaskRequestSchema } from "./schemas/TaskRequestSchema"
import { TaskRepository } from "../repositories/TasksRepository"

export class TasksController {
    constructor(private readonly tasksRepository: TaskRepository) { }

  index: Handler = async (req, res, next) => {
      const [err, tasks] = await to (this.tasksRepository.find())
      res.json(tasks)
    
  }

  create: Handler = async (req, res, next) => {
        const body = CreateTaskRequestSchema.parse(req.body)
        const [err, newTask] = await to (this.tasksRepository.create( body ))
        res.status(201).json(newTask)
    }

   show: Handler = async (req, res, next) => {
         const [err, task] = await to (this.tasksRepository.findById(Number(req.params.id)))
   
         if (!task) throw new HttpError(404, "tarefa nao encontrada")
   
         res.json(task)
     }
     
    update: Handler = async (req, res, next) => {
          const id = Number(req.params.id)
          const body = UpdateTaskRequestSchema.parse(req.body)
    
          const [err, updatedTask] = await to (this.tasksRepository.updateById(id, body))
          if (!updatedTask) throw new HttpError(404, "tarefa nao encontrada")
    
          res.json(updatedTask)
      }
      
    delete: Handler = async (req, res, next) => {
      const id = Number(req.params.id)

      const [err, deletedTask] = await to (this.tasksRepository.deleteById(id))
      if (!deletedTask) throw new HttpError(404, "tarefa nao encontrada")

      res.json(deletedTask)
  }  

  addVolunteer: Handler = async (req, res, next) => {
             const tasksId = Number(req.params.tasksId)
             const {volunteerId} = AddVolunteerRequestSchema.parse(req.body) 
             const [err, updatedTask] = await to (this.tasksRepository.addVolunteer(tasksId, volunteerId))
             res.status(201).json(updatedTask)
      }
  
      removeVolunteer: Handler = async (req, res, next) => {
             const tasksId = Number(req.params.tasksId)
      const volunteerId = Number(req.params.volunteerId)
             const [err, updatedTask] = await to (this.tasksRepository.removeVolunteer(tasksId, volunteerId))
             res.status(201).json(updatedTask)
      }
}