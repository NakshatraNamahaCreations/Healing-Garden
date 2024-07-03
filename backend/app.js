const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database connected successfully`);
  })
  .catch((err) => {
    console.error(`Error connecting to the database: ${err}`);
  });

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("Public"));
app.use(express.urlencoded({ extended: true }));

// Routes
const Auth = require("./Controller/auth");
const Banner = require("./Controller/Banner");
const category = require("./Route/Category");
const user = require("./Route/user");
const workshop = require("./Route/Product");
const cart = require("./Route/AddtoCart");
const Order = require("./Route/order");
const Proposal = require("./Route/proposal");
app.use("/api", Auth);
app.use("/api/banner", Banner);
app.use("/api/category", category);
app.use("/api/user", user);
app.use("/api/workshop", workshop);
app.use("/api/cart", cart);
app.use("/api/order", Order);
app.use("/api/proposal", Proposal);

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
