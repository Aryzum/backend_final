import { api } from '../lib/axios'

export async function getTasks() {
  const { data } = await api.get('/tasks')

  return data
}
