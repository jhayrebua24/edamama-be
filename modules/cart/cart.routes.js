const express = require("express");
const CartService = require("./cart.service");
const checkValidation = require("../../middleware/checkValidation");
const { addCartValidation } = require("./cart.validators");
const auth = require("../../middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => await CartService.listCart(req, res));

router.post(
  "/",
  auth,
  addCartValidation,
  checkValidation,
  async (req, res) => await CartService.addToCart(req, res)
);

module.exports = router;
