// routes/userRoutes.js

// Importowanie Express oraz validatora dla danych wejściowych
const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/userController"); // Importowanie kontrolera użytkowników

const router = express.Router(); // Tworzenie nowego routera Express

// Endpoint do pobierania listy użytkowników
router.get("/users", userController.getUsers);

// Endpoint do dodawania nowego użytkownika z walidacją danych wejściowych
router.post(
  "/users",
  [
    body("name").isString().notEmpty().withMessage("Imię jest wymagane"), // Imię nie może być puste i musi być stringiem
    body("email").isEmail().withMessage("Niepoprawny adres email"), // Sprawdzenie poprawności adresu e-mail
    body("age")
      .isInt({ min: 1 })
      .withMessage("Wiek musi być liczbą większą od 0"), // Wiek musi być liczbą całkowitą większą od 0
    body("username")
      .isAlphanumeric()
      .withMessage("Login powinien być alfanumeryczny"), // Login może zawierać tylko litery i cyfry
  ],
  userController.addUser
);

// Endpoint do aktualizacji użytkownika na podstawie jego ID
router.put("/users/:id", userController.updateUser);

// Endpoint do usuwania użytkownika na podstawie jego ID
router.delete("/users/:id", userController.deleteUser);

// Eksportowanie routera, aby mógł być używany w głównym pliku aplikacji
module.exports = router;
