import { api } from '../lib/axios'

export async function signIn({ email, password }) {
  const { data } = await api.post('/login', { email, password })

  console.log(data)

  localStorage.setItem('token', data.token)
  localStorage.setItem('userEmail', data.user.email)
}
