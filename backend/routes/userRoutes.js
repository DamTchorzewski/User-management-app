const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/users", userController.getUsers);

router.post(
  "/users",
  [
    body("name").isString().notEmpty().withMessage("Imię jest wymagane"),
    body("email").isEmail().withMessage("Niepoprawny adres email"),
    body("age")
      .isInt({ min: 1 })
      .withMessage("Wiek musi być liczbą większą od 0"),
    body("username")
      .isAlphanumeric()
      .withMessage("Login powinien być alfanumeryczny"),
  ],
  userController.addUser
);

router.put("/users/:id", userController.updateUser);

router.delete("/users/:id", userController.deleteUser);

module.exports = router;
