const User = require("../models/User");
const { validationResult } = require("express-validator");
const asyncHandler = require("../middlewares/asyncHandler");
const userSchema = require("../validators/userValidator");
const logger = require("../utils/logger");

exports.getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.getUsers();
    logger.info(`Pobrano ${users.length} użytkowników`);
    res.json(users);
  } catch (error) {
    logger.error(`Błąd podczas pobierania użytkowników: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

exports.addUser = asyncHandler(async (req, res) => {
  // Walidacja danych wejściowych za pomocą Joi
  const { error } = userSchema.validate(req.body);

  if (error) {
    // Jeśli walidacja nie przejdzie, zwróć szczegółowe komunikaty o błędach
    logger.warn(
      `Błąd walidacji danych użytkownika: ${error.details
        .map((e) => e.message)
        .join(", ")}`
    );
    return res.status(400).json({
      errors: error.details.map((e) => ({
        message: e.message, // Komunikat błędu
        path: e.path[0], // Ścieżka do pola, które zawiera błąd
      })),
    });
  }

  const { name, email, age, username } = req.body;
  try {
    const result = await User.addUser(name, email, age, username);
    logger.info(`Dodano użytkownika: ${username}`);
    res.json(result);
  } catch (error) {
    logger.error(`Błąd podczas dodawania użytkownika: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

exports.updateUser = async (req, res) => {
  const { name, email, age, username } = req.body;
  try {
    const result = await User.updateUser(
      req.params.id,
      name,
      email,
      age,
      username
    );
    logger.info(`Zaktualizowano użytkownika o ID: ${req.params.id}`);
    res.json(result);
  } catch (err) {
    logger.error(
      `Błąd podczas aktualizacji użytkownika o ID ${req.params.id}: ${err.message}`
    );
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await User.deleteUser(req.params.id);
    logger.info(`Usunięto użytkownika o ID: ${req.params.id}`);
    res.json(result);
  } catch (err) {
    logger.error(
      `Błąd podczas usuwania użytkownika o ID ${req.params.id}: ${err.message}`
    );
    res.status(500).json({ error: err.message });
  }
};
