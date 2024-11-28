import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export async function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Autenticação requerida' })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)

    const user = await User.findById(decodedToken.userId)

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    req.user = user

    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    res.status(401).json({ message: 'Token inválido' });
  }
}
