import { Task } from '../models/Task.js'

export async function createTask(req, res) {
  try {
    const { title } = req.body

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'O título da tarefa é obrigatório' })
    }

    const task = await Task.create({
      title: title.trim(),
      completed: false,
      author: req.user.id
    })

    return res.status(201).json(task)
  } catch (error) {
    console.error('Erro ao criar tarefa:', error)
    return res.status(500).json({ message: 'Erro interno ao criar tarefa' })
  }
}

export async function getTasks(req, res) {
  try {
    const tasks = await Task.find({ author: req.user.id })
      .sort({ createdAt: -1 }) // Ordena do mais recente para o mais antigo
      .select('-__v') // Remove o campo __v da resposta

    return res.status(200).json(tasks)
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error)
    return res.status(500).json({ message: 'Erro interno ao buscar tarefas' })
  }
}

export async function updateTask(req, res) {
  try {
    const { id } = req.params
    const { title, completed } = req.body

    // Verifica se a tarefa existe e pertence ao usuário
    const existingTask = await Task.findOne({ _id: id, author: req.user.id })
    
    if (!existingTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' })
    }

    // Validação dos campos
    if (title !== undefined && title.trim() === '') {
      return res.status(400).json({ message: 'O título da tarefa não pode estar vazio' })
    }

    const updateData = {}
    if (title !== undefined) updateData.title = title.trim()
    if (completed !== undefined) updateData.completed = completed

    const taskUpdated = await Task.findByIdAndUpdate(
      id,
      updateData,
      { new: true, select: '-__v' }
    )

    return res.status(200).json(taskUpdated)
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error)
    return res.status(500).json({ message: 'Erro interno ao atualizar tarefa' })
  }
}

export async function deleteTask(req, res) {
  try {
    const { id } = req.params

    // Verifica se a tarefa existe e pertence ao usuário
    const existingTask = await Task.findOne({ _id: id, author: req.user.id })
    
    if (!existingTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' })
    }

    await Task.findByIdAndDelete(id)
    return res.sendStatus(204)
  } catch (error) {
    console.error('Erro ao remover tarefa:', error)
    return res.status(500).json({ message: 'Erro interno ao remover tarefa' })
  }
}
