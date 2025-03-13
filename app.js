const express = require("express");
const morgan = require("morgan");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/products", productRoutes);
app.use("/api/signup", userRoutes);
app.use("/api/login", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(express.json({ limit: "10kb" }));

module.exports = app;
