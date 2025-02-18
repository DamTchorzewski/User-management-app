function errorHandler(err, req, res, next) {
  console.error(err.stack); // Logowanie błędów na serwerze

  if (err.isJoi) {
    // Błędy walidacji Joi
    return res.status(400).json({
      message: "Błąd walidacji",
      details: err.details.map((detail) => detail.message),
    });
  }

  // Inne błędy
  res.status(500).json({
    message: "Coś poszło nie tak, spróbuj ponownie",
  });
}

module.exports = errorHandler;
