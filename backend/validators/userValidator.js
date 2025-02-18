const Joi = require("joi"); // Importowanie Joi

const userSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.base": "Imię musi być tekstem",
    "string.empty": "Imię jest wymagane",
    "string.min": "Imię musi mieć co najmniej 3 znaki",
    "any.required": "Imię jest wymagane",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "Email musi być tekstem",
    "string.empty": "Email jest wymagany",
    "string.email": "Niepoprawny adres email",
    "any.required": "Email jest wymagany",
  }),

  age: Joi.number().integer().min(1).required().messages({
    "number.base": "Wiek musi być liczbą",
    "number.integer": "Wiek musi być liczbą całkowitą",
    "number.min": "Wiek musi być większy niż 0",
    "any.required": "Wiek jest wymagany",
  }),

  username: Joi.string().alphanum().min(3).required().messages({
    "string.base": "Login musi być tekstem",
    "string.empty": "Login jest wymagany",
    "string.alphanum": "Login powinien zawierać tylko litery i cyfry",
    "string.min": "Login musi mieć co najmniej 3 znaki",
    "any.required": "Login jest wymagany",
  }),
});

module.exports = userSchema;
