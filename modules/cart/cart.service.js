const Cart = require("./cart.model");
const User = require("../users/users.model");
const Product = require("../products/products.model");

const addToCart = async (req, res) => {
  try {
    const { product_slug, quantity } = req.body;
    const { id } = req.user;
    const product = await Product.findOne({
      slug: product_slug,
    });
    const user = await User.findById(id);

    if (!product)
      return res.status(400).json({
        message: "Sorry!, Invalid product",
      });

    if (!user)
      return res.status(400).json({
        message: "Sorry!, Invalid user",
      });

    const data = await Cart.create({
      product,
      user,
      quantity,
    });

    return res.json({
      message: "Product successfully added to cart",
      data,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const listCart = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user)
      return res.status(400).json({
        message: "Sorry!, Invalid user",
      });

    const data = await Cart.find({
      user,
    }).populate("product");

    return res.json({
      data,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports = {
  addToCart,
  listCart,
};
