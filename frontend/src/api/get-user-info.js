import { api } from '../lib/axios'

export async function getUserInfo() {
  const { data } = await api.get('/admin/users-tasks')
  return data
}
