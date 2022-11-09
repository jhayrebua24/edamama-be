const express = require("express");
const ProductService = require("./products.service");
const checkValidation = require("../../middleware/checkValidation");
const { addProductValidation } = require("./products.validators");
const checkIfAdmin = require("../../middleware/checkifAdmin");
const router = express.Router();

router.get("/", async (req, res) => await ProductService.getProducts(req, res));
router.get(
  "/:productSlug",
  async (req, res) => await ProductService.getSingleProduct(req, res)
);
router.post(
  "/",
  checkIfAdmin,
  addProductValidation,
  checkValidation,
  async (req, res) => await ProductService.addProduct(req, res)
);

module.exports = router;
