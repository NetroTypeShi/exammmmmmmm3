import basicAuth from 'express-basic-auth'
import { users } from '../database/users.js'
export const authMiddleware = basicAuth({
  users,
  challenge: true,
  unauthorizedResponse: 'Credenciales inválidas'
})
