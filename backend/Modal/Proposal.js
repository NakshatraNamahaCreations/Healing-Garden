const mongoose = require("mongoose");
const Order = new mongoose.Schema(
  {
    companyname: { type: Object, default: {} },
    mobileno: { type: String, default: "" },
    email: { type: String, default: "" },
    workshop: { type: String, default: "" },
    max: { type: String, default: "" },
    message: { type: String, default: "" },
    Username: { type: String, default: "" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("proposal", Order);
//
