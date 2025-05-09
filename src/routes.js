import express from 'express'
import cors from 'cors'

import { authenticate } from './middlewares/auth.js'

import { login } from './controllers/login.js'
import { register } from './controllers/register.js'
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from './controllers/task.js'
import { getAllUsersAndTasks } from './controllers/get_all_users_and_tasks.js'

export const routes = express.Router()

routes.use(cors())

// Autenticação
routes.post('/register', register)
routes.post('/login', login)

// // Verifica se usuário está autenticado
routes.use(authenticate)

// Tasks
routes.get('/tasks', getTasks)
routes.post('/task', createTask)
routes.put('/task/:id', updateTask)
routes.delete('/task/:id', deleteTask)

routes.get('/admin/users-tasks', getAllUsersAndTasks)

routes.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' })
})
