# Documentación del proyecto

## ¿Qué es este proyecto?

Este proyecto es una aplicación backend en Node.js con Express que permite el registro y autenticación de usuarios usando una base de datos SQLite. Los usuarios pueden registrarse, iniciar sesión y acceder a un área privada donde se listan todos los usuarios registrados.

---

## ¿Cómo arrancar el proyecto?

1. **Clona el repositorio y entra en la carpeta del proyecto:**
   ```bash
   git clone <url-del-repo>
   cd exammmmmmmm3

2. **Instala las dependencias:**
```bash
npm i express
npm i express-session
npm install --save-dev nodemon standard
npm install express express-basic-auth sqlite3
```

3. **Arrancar el servidor**
```bash
npm run dev
```
Esto ejecutará el servidor y, automáticamente, creará la base de datos y la tabla de usuarios si no existen.

4. **Corregir estilo del código**
```bash
npm run lint
```

## Estructura de archivos y funciones principales
- index.js
Arranque del servidor y definición de rutas.
Importa y ejecuta init.js para asegurar que la base de datos esté lista.
Define rutas públicas (/, /register, /login) y privadas (/private).
Usa sesiones para gestionar la autenticación de usuarios.
- init.js
Inicializa la base de datos SQLite.
Crea la tabla users si no existe.
Se ejecuta automáticamente al iniciar el servidor gracias a la importación en index.js.
- users.js
Contiene funciones para interactuar con la base de datos de usuarios:

- getUserPassword(username)
Busca la contraseña de un usuario en la base de datos.
Se usa para validar el login.
registerUser(username, password)
Inserta un nuevo usuario en la base de datos.
Devuelve false si el usuario ya existe.
- getAllUsers()
Devuelve un array con todos los nombres de usuario registrados.
Se usa para mostrar la lista de usuarios en el área privada.
auth.js
(En la versión con formulario, este archivo puede no ser necesario)
Si se usa HTTP Basic, contiene el middleware para proteger rutas usando autenticación básica.
## ¿Cómo funciona la autenticación y el registro?
- Registro:
El usuario accede a /register, rellena el formulario y sus datos se guardan en la base de datos si el nombre de usuario no existe.

- Login:
El usuario accede a /login, rellena el formulario. Si el usuario y la contraseña coinciden con los de la base de datos, se guarda la sesión y puede acceder a /private.

- Área privada:
Solo accesible si el usuario ha iniciado sesión. Muestra la lista de todos los usuarios registrados.

- Logout:
El usuario puede cerrar sesión y será redirigido a la página de login.

## ¿Por qué se puso cada cosa?
- Base de datos SQLite:
Permite persistencia de usuarios sin necesidad de un servidor externo.
- init.js importado en index.js:
Garantiza que la base de datos y la tabla estén listas cada vez que se arranca el servidor.
- Sesiones (express-session):
Permiten recordar al usuario autenticado entre peticiones y proteger rutas privadas.
Rutas /register y /login con formularios:
Mejoran la experiencia de usuario frente al popup de HTTP Basic.
- Linter y script dev:
Facilitan el desarrollo y el mantenimiento del código.