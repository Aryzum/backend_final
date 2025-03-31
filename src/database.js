import mongoose from 'mongoose'

export async function connectDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('A variável de ambiente MONGODB_URI não está definida')
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      // Estas opções são recomendadas para melhor estabilidade
      maxPoolSize: 10, // Mantém até 10 conexões simultâneas
      serverSelectionTimeoutMS: 5000, // Tempo limite para seleção do servidor
      socketTimeoutMS: 45000, // Tempo limite para operações
    })

    console.log('✅ Conectado ao MongoDB com sucesso!')

    // Manipuladores de eventos para monitorar a conexão
    mongoose.connection.on('error', (error) => {
      console.error('❌ Erro na conexão com MongoDB:', error)
    })

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ Desconectado do MongoDB')
    })

    // Manipula o encerramento gracioso
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close()
        console.log('Conexão com MongoDB fechada devido ao encerramento da aplicação')
        process.exit(0)
      } catch (error) {
        console.error('Erro ao fechar conexão com MongoDB:', error)
        process.exit(1)
      }
    })
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error)
    process.exit(1)
  }
}
