const { validationResult } = require("express-validator");

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json(errors.array());
  next();
};

module.exports = checkValidation;
