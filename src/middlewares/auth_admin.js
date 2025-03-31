export function authorizeAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'Autenticação requerida' })
  }

  if (!req.user.admin) {
    return res.status(403).json({
      message: 'Acesso negado: somente administradores podem acessar esta rota',
    })
  }

  next()
}
