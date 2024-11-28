import { api } from '../lib/axios'

export async function createTask({ title, completed = false }) {
  const { data } = await api.post('/task', { title, completed })

  return data
}
