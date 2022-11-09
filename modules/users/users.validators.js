const { body } = require("express-validator");

const User = require("./users.model");

const registerValidation = [
  body("username")
    .isString()
    .exists("Username is required")
    .isLength({
      min: 4,
    })
    .withMessage("Username must be at least 4 characters")
    .isLength({
      max: 12,
    })
    .withMessage("Username must be at most 12 characters")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) throw new Error("Username already in use");
    }),
  body("password")
    .isString()
    .exists("Password is required")
    .isLength({
      min: 4,
    })
    .withMessage("Password should be at least 4 characters")
    .isLength({
      max: 12,
    })
    .withMessage("Password should be at most 12 characters")
    .notEmpty()
    .withMessage("Password cannot be empty"),
  body("email")
    .exists("Email is required")
    .isEmail()
    .withMessage("Email is not valid")
    .notEmpty()
    .withMessage("Email cannot be empty"),
];

const loginValidation = [
  body("username")
    .isString()
    .exists("Username is required")
    .isLength({
      min: 4,
    })
    .withMessage("Username must be at least 4 characters")
    .isLength({
      max: 12,
    })
    .withMessage("Username must be at most 12 characters")
    .notEmpty()
    .withMessage("Username cannot be empty"),
  body("password")
    .isString()
    .exists("Password is required")
    .isLength({
      min: 4,
    })
    .withMessage("Password should be at least 4 characters")
    .isLength({
      max: 12,
    })
    .withMessage("Password should be at most 12 characters")
    .notEmpty()
    .withMessage("Password cannot be empty"),
];

module.exports = {
  registerValidation,
  loginValidation,
};
