import './database/init.js' // Esto ejecuta la inicialización de la base de datos
import express from 'express'
import session from 'express-session'
import { registerUser, getAllUsers, getUserPassword } from './database/users.js'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'supersecreto', // Cambia esto por algo seguro en producción
  resave: false,
  saveUninitialized: false
}))

app.get('/', (req, res) => {
  res.send('Público')
})

// Página de login (GET)
app.get('/login', (req, res) => {
  res.send(`
    <h1>Iniciar sesión</h1>
    <form method="POST" action="/login">
      <input name="username" placeholder="Usuario" required>
      <input name="password" type="password" placeholder="Contraseña" required>
      <button type="submit">Iniciar sesión</button>
    </form>
    <a href="/register">Registrarse</a>
  `)
})

// Procesa el login (POST)
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).send('Faltan datos')
  }
  try {
    const userPassword = await getUserPassword(username)
    if (userPassword && userPassword === password) {
      req.session.user = username
      return res.redirect('/private')
    }
    res.status(401).send('Usuario o contraseña incorrectos')
  } catch (e) {
    res.status(500).send('Error en el login')
  }
})

// Middleware para proteger rutas
function requireLogin (req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login')
  }
  next()
}

app.get('/private', requireLogin, async (req, res) => {
  try {
    const users = await getAllUsers()
    res.send(`
      <h1>Entraste al área protegida</h1>
      <h2>Usuarios registrados:</h2>
      <ul>
        ${users.map(u => `<li>${u}</li>`).join('')}
      </ul>
      <a href="/logout">Cerrar sesión</a>
    `)
  } catch (e) {
    res.status(500).send('Error al obtener usuarios')
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
})

// Página de registro (GET)
app.get('/register', (req, res) => {
  res.send(`
    <h1>Registro de usuario</h1>
    <form method="POST" action="/register">
      <input name="username" placeholder="Usuario" required>
      <input name="password" type="password" placeholder="Contraseña" required>
      <button type="submit">Registrarse</button>
    </form>
    <a href="/login">Iniciar sesión</a>
  `)
})

// Procesa el registro (POST)
app.post('/register', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).send('Faltan datos')
  }
  try {
    const ok = await registerUser(username, password)
    if (!ok) return res.status(409).send('El usuario ya existe')
    res.send('Usuario registrado correctamente. <a href="/login">Iniciar sesión</a>')
  } catch (e) {
    console.error(e) // <-- Añade esto
    res.status(500).send('Error en el registro')
  }
})

app.listen(3000, () => console.log('Servidor en http://localhost:3000'))
