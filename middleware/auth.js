import basicAuth from 'express-basic-auth'
import { getUserPassword } from '../database/users.js'

export const authMiddleware = basicAuth({
  authorizer: async (username, password, cb) => {
    try {
      const userPassword = await getUserPassword(username)
      cb(null, userPassword === password)
    } catch {
      cb(null, false)
    }
  },
  authorizeAsync: true,
  challenge: true,
  unauthorizedResponse: 'Credenciales inválidas'
})
