const db = require("../database");

class User {
  static addUser(name, email, age, username) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO users (name, email, age, username) VALUES (?, ?, ?, ?)`;
      db.run(sql, [name, email, age, username], function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID });
      });
    });
  }

  static getUsers() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  static updateUser(id, name, email, age, username) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE users SET name = ?, email = ?, age = ?, username = ? WHERE id = ?`;
      db.run(sql, [name, email, age, username, id], function (err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      });
    });
  }

  static deleteUser(id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM users WHERE id = ?`;
      db.run(sql, [id], function (err) {
        if (err) return reject(err);
        resolve({ message: "Użytkownik usunięty", changes: this.changes });
      });
    });
  }
}

module.exports = User;
