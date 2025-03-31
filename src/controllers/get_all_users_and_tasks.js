import { User } from '../models/User.js'
import { Task } from '../models/Task.js'

export async function getAllUsersAndTasks(req, res) {
  try {
    const users = await User.find().select('name email admin')
    const tasks = await Task.find()

    const usersWithTasks = users.map((user) => {
      const userTasks = tasks.filter(
        (task) => task.author.toString() === user._id.toString(),
      )
      return { ...user.toObject(), tasks: userTasks }
    })

    res.status(200).json(usersWithTasks)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erro ao buscar usuários e tarefas', error })
  }
}
