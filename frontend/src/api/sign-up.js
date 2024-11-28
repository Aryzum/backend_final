import { api } from '../lib/axios'

export async function signUp({ username, email, password }) {
  const { data } = await api.post('/register', { username, email, password })

  return data
}
