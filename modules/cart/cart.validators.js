const { body } = require("express-validator");

const addCartValidation = [
  body("product_slug").isString().exists("Product Slug is required"),
];

module.exports = {
  addCartValidation,
};
