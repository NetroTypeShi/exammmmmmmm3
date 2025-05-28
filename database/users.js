import sqlite3 from 'sqlite3'

export function getUserPassword (username) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('users.db')
    db.get('SELECT password FROM users WHERE username = ?', [username], (err, row) => {
      db.close()
      if (err) return reject(err)
      if (!row) return resolve(null)
      resolve(row.password)
    })
  })
}

export function registerUser (username, password) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('users.db')
    db.run(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password],
      function (err) {
        db.close()
        if (err) {
          if (err.code === 'SQLITE_CONSTRAINT') return resolve(false)
          return reject(err)
        }
        resolve(true)
      }
    )
  })
}

export function getAllUsers () {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('users.db')
    db.all('SELECT username FROM users', (err, rows) => {
      db.close()
      if (err) return reject(err)
      resolve(rows.map(row => row.username))
    })
  })
}
