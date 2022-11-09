const express = require("express");
const { registerValidation, loginValidation } = require("./users.validators");
const UsersService = require("./users.service");
const checkValidation = require("../../middleware/checkValidation");
const router = express.Router();

router.post(
  "/register",
  [registerValidation],
  checkValidation,
  async (req, res) => await UsersService.register(req, res)
);

router.post(
  "/login",
  [loginValidation],
  checkValidation,
  async (req, res) => await UsersService.login(req, res)
);

module.exports = router;
