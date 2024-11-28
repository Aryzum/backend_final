import { api } from '../lib/axios'

export async function putTask({ id, completed }) {
  await api.put(`/task/${id}`, { completed })
}
