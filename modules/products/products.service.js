const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Product = require("./products.model");
const { JWT_SECRET } = require("../../config/credentials");
const { slugify } = require("../../utils/helpers");

const getProducts = async (_req, res) => {
  try {
    const products = await Product.find();
    return res.json({
      data: products,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const data = await Product.findOne({
      slug: req.params.productSlug,
    });

    if (!data)
      return res.status(404).json({
        message: "Sorry!, Cannot find product",
      });

    return res.json({
      data,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const addProduct = async (req, res) => {
  try {
    const data = await Product.create({
      ...req.body,
      slug: slugify(req.body.title),
    });
    return res.json({
      message: "Product created",
      data,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports = {
  getProducts,
  addProduct,
  getSingleProduct,
};
