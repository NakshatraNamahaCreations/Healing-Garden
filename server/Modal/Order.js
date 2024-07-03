const mongoose = require("mongoose");
const Order = new mongoose.Schema(
  {
    OrderDetails: { type: Object, default: {} },
    userId: { type: String, default: "" },
    orderStatus: String,
    OrderID: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", Order);


