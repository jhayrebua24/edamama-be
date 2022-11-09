const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URL } = require("./config/credentials");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(express.json());
app.use(cors());

const start = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to mongoose");
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// routes
app.use("/api/users", require("./modules/users/users.routes"));
app.use("/api/products", require("./modules/products/products.routes"));
app.use("/api/cart", require("./modules/cart/cart.routes"));

start();
