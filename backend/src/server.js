import express from 'express'
import { connectDB } from './database.js'
import { routes } from './routes.js'

const server = express()

server.use(express.json())

server.use(routes)

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 3333, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco:', error)
    process.exit(1)
  })

server.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Erro interno no servidor' })
})
