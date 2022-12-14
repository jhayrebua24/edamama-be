const Product = require("./products.model");
const {
  slugify,
  transformPaginatedResult,
  formatPaginationParams,
} = require("../../utils/helpers");

const getProducts = async (req, res) => {
  try {
    const products = await Product.paginate(
      {
        title: { $regex: req.query.q || ``, $options: "i" },
      },
      formatPaginationParams(req)
    );
    return res.json(transformPaginatedResult(products));
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
