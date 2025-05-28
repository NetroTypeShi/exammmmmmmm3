# Examen final BBDD + LMSGI

## Contexto

Tienes un backend creado con Express que actualmente gestiona un sistema de autenticacion HTTP Basic.

No existe base de datos, los usuarios y contraseñas están almacenados en el archivo `database/users.js` en un objeto con la siguiente estructura:

```javascript
{
  "user1": "password1",
  "user2": "password2"
}
```

Dispones de un middleware para autenticarlos, está localizado en `middleware/auth.js`.

El archivo `index.js` es el punto de entrada de la aplicación.

## Objetivo

Deberás implementar cuantas más funcionalidades puedas de las siguientes:

- Mejora el entorno de desarrollo, crea un script `dev` en el `package.json` que reinicie el servidor automáticamente al detectar cambios en el código fuente.
- Sustituir el objeto de usuarios por una base de datos SQLite3 o mySQL.
- Añade una pagina de registro de usuarios:
  - El registro debe ser accesible desde la ruta `/register`.
  - El formulario de registro debe solicitar un `username`, `password`.
- Añade un linter y crea un script `lint` en el `package.json` que arregle los errores de estilo.
- Busca información sobre el sistema de autenticación usado en este proyecto, documenta **como funciona**, además de **sus ventajas y desventajas** frente a otros mecanismos de autenticación.
