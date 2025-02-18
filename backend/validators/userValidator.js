const Joi = require("joi"); // Dodaj ten import na początku pliku

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(1).required(),
  username: Joi.string().alphanum().min(3).required(),
});

module.exports = userSchema;
