const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

const db = `mongodb+srv://root:root@my-cluster.emkzjkx.mongodb.net/?retryWrites=true&w=majority`;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const start = async () => {
  try {
    await mongoose.connect(db, {
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

start();
