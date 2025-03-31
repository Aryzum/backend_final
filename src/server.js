import express from 'express'
import cors from 'cors'
import { connectDB } from './database.js'
import { routes } from './routes.js'

const server = express()

// Middlewares de segurança e configuração
server.use(express.json({ limit: '10kb' })) // Limita o tamanho do payload JSON
server.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // URL do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

// Rate limiting simples
const requestCounts = new Map()
const WINDOW_MS = 15 * 60 * 1000 // 15 minutos
const MAX_REQUESTS = 100 // máximo de requisições por IP no período

server.use((req, res, next) => {
  const ip = req.ip
  const now = Date.now()
  const windowStart = now - WINDOW_MS

  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, [])
  }

  const requests = requestCounts.get(ip)
  const validRequests = requests.filter(time => time > windowStart)
  requestCounts.set(ip, validRequests)

  if (validRequests.length >= MAX_REQUESTS) {
    return res.status(429).json({ 
      message: 'Muitas requisições. Tente novamente mais tarde.'
    })
  }

  validRequests.push(now)
  next()
})

// Rotas da API
server.use('/api', routes)

// Tratamento de erros
server.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint não encontrado' })
})

server.use((err, req, res, next) => {
  console.error('❌ Erro:', err)

  // Erros de validação do Mongoose
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Erro de validação',
      errors: Object.values(err.errors).map(e => e.message)
    })
  }

  // Erros de Cast do Mongoose (ex: ID inválido)
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Formato de dados inválido',
      error: err.message
    })
  }

  // Erro interno genérico
  res.status(500).json({ 
    message: 'Erro interno no servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// Inicialização do servidor
const PORT = process.env.PORT || 3333

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`
🚀 Servidor rodando!
📍 Local: http://localhost:${PORT}
⏰ ${new Date().toLocaleString()}
      `)
    })
  })
  .catch((error) => {
    console.error('❌ Erro ao iniciar servidor:', error)
    process.exit(1)
  })

// Tratamento de encerramento gracioso
process.on('SIGTERM', () => {
  console.log('Recebido SIGTERM. Encerrando servidor...')
  server.close(() => {
    console.log('Servidor encerrado')
    process.exit(0)
  })
})
