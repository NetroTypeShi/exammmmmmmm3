import express from 'express'
import { authMiddleware } from './middleware/auth.js'
const app = express()

app.get('/', (req, res) => {
  res.send('Público')
})

app.get('/private', authMiddleware, (req, res) => {
  res.send('Entraste al área protegida')
})

app.get('/logout', (req, res) => {
  res.set('WWW-Authenticate', 'Basic realm="logout"')
  return res.status(401).send('Has cerrado sesión. Recarga la página para volver a ingresar credenciales.')
})

app.listen(3000, () => console.log('Servidor en http://localhost:3000'))
