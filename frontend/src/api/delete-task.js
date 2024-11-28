import { api } from '../lib/axios'

export async function deleteTask(id) {
  await api.delete(`/task/${id}`)
}
