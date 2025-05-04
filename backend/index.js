require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const ProductsRoute = require("./routes/product");
const AuthRoute = require("./routes/auth");

app.use(cors());
app.use(express.json());

app.use("/api/products", ProductsRoute);
app.use("/api/auth", AuthRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Ulandi"))
  .catch((err) => {
    console.log("❌ MongoDB xatosi:", err);
    process.exit();
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server ishlamoqda: http://localhost:${port}`);
});
