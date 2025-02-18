const User = require("../models/User");
const { validationResult } = require("express-validator");
const asyncHandler = require("../middlewares/asyncHandler");
const userSchema = require("../validators/userValidator");

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.getUsers();
  res.json(users);
});

exports.addUser = asyncHandler(async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }

  const { name, email, age, username } = req.body;
  const result = await User.addUser(name, email, age, username);
  res.json(result);
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
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await User.deleteUser(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
