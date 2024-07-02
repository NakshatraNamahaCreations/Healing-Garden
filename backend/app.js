const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const path = require("path");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const shortid = require("shortid");

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
// Razorpay Configuration
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// Serve Logo
// app.get("/logo.svg", (req, res) => {
//   res.sendFile(path.join(__dirname, "logo.svg"));
// });

// Payment Verification Endpoint
// app.post("/verification", (req, res) => {
//   const secret = "razorpaysecret"; // Ideally, this should come from environment variable

//   const shasum = crypto.createHmac("sha256", secret);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest("hex");

//   if (digest === req.headers["x-razorpay-signature"]) {
//     console.log("Request is legitimate");
//     res.status(200).json({ message: "OK" });
//   } else {
//     res.status(403).json({ message: "Invalid" });
//   }
// });

// Razorpay Payment Creation Endpoint
// app.post("/razorpay", async (req, res) => {
//   const payment_capture = 1;
//   const amount = 500; // Example amount, you can dynamically set this based on your business logic
//   const currency = "INR"; // Example currency, adjust as per your requirements

//   const options = {
//     amount,
//     currency,
//     receipt: shortid.generate(),
//     payment_capture,
//   };

//   try {
//     const response = await razorpay.orders.create(options);
//     console.log(response);
//     res.status(200).json({
//       id: response.id,
//       currency: response.currency,
//       amount: response.amount,
//     });
//   } catch (err) {
//     console.error("Error creating Razorpay order:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// Start the server
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
