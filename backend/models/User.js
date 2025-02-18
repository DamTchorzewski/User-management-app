// models/User.js

// Importowanie połączenia z bazą danych
const db = require("../database");

class User {
  // Metoda do dodawania nowego użytkownika do bazy danych
  static addUser(name, email, age, username) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO users (name, email, age, username) VALUES (?, ?, ?, ?)`; // SQL do wstawienia nowego użytkownika
      db.run(sql, [name, email, age, username], function (err) {
        if (err) return reject(err); // Obsługa błędu
        resolve({ id: this.lastID }); // Zwracanie ID nowo dodanego użytkownika
      });
    });
  }

  // Metoda do pobierania wszystkich użytkowników z bazy danych
  static getUsers() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) return reject(err); // Obsługa błędu
        resolve(rows); // Zwracanie listy użytkowników
      });
    });
  }

  // Metoda do aktualizacji danych użytkownika w bazie danych na podstawie ID
  static updateUser(id, name, email, age, username) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE users SET name = ?, email = ?, age = ?, username = ? WHERE id = ?`; // SQL do aktualizacji użytkownika
      db.run(sql, [name, email, age, username, id], function (err) {
        if (err) return reject(err); // Obsługa błędu
        resolve({ changes: this.changes }); // Zwracanie liczby zmienionych rekordów
      });
    });
  }

  // Metoda do usuwania użytkownika na podstawie ID
  static deleteUser(id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM users WHERE id = ?`; // SQL do usunięcia użytkownika
      db.run(sql, [id], function (err) {
        if (err) return reject(err); // Obsługa błędu
        resolve({ message: "Użytkownik usunięty", changes: this.changes }); // Zwracanie statusu operacji
      });
    });
  }
}

// Eksportowanie klasy User do użycia w innych modułach aplikacji
module.exports = User;
