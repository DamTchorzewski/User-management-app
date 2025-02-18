// utils/logger.js
const winston = require("winston");

const logger = winston.createLogger({
  level: "info", // Domyślny poziom logowania
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Logowanie do konsoli
    new winston.transports.File({ filename: "logs/app.log" }), // Logowanie do pliku
  ],
});

module.exports = logger;
