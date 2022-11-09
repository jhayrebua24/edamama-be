const { body } = require("express-validator");
const { slugify } = require("../../utils/helpers");
const { categories } = require("./products.constants");

const Product = require("./products.model");

const addProductValidation = [
  body("title")
    .isString()
    .exists("Title is required")
    .isLength({
      min: 2,
    })
    .withMessage("Title must be at least 2 characters")
    .isLength({
      max: 12,
    })
    .withMessage("Title must be at most 12 characters")
    .notEmpty()
    .withMessage("Title cannot be empty")
    .custom(async (value) => {
      const user = await Product.findOne({ slug: slugify(value) });
      if (user) throw new Error("Product already exist");
    }),
  body("description")
    .isString()
    .exists("Description is required")
    .isLength({
      min: 6,
    })
    .withMessage("Description must be at least 2 characters")
    .isLength({
      max: 100,
    })
    .withMessage("Description must be at most 100 characters")
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("img_url").isURL().optional({ nullable: true }),
  body("price").isNumeric().exists("Price is required"),
  body("categories")
    .isArray()
    .exists("Categories is required")
    .custom(async (value) => {
      if (!value.every((categ) => categories.includes(categ)))
        throw new Error("Invalid Category");
    }),
];
module.exports = {
  addProductValidation,
};
