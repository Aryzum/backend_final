import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

export async function login(req, res, next) {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      console.log('Usuário não encontrado')
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    const passwordMatch = await user.compareHash(password)

    if (!passwordMatch) {
      console.log('Senhas não conferem!')
      return res.status(401).json({ message: 'Senha incorreta' })
    }

    const token = jwt.sign(
      { userId: user._id, admin: user.admin },
      process.env.SECRET_KEY,
      {
        expiresIn: '1 hour',
      },
    )

    res.json({
      token,
      user: { name: user.name, email: user.email, admin: user.admin },
    })
  } catch (error) {
    next(error)
  }
}
