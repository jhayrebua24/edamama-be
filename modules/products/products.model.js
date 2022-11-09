const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
    default: "https://loremflickr.com/640/360",
  },
  price: {
    type: Number,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

ProductSchema.plugin(mongoosePaginate);
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
