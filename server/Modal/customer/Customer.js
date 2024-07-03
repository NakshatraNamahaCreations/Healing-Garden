const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    Id: { type: String, default: "", required: true },
    joiningdate: { type: String, default: "", required: true },
    name: { type: String, default: "", required: true },
    email: { type: String, default: "", required: true },
    phone: { type: String, default: "", required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Customer", CustomerSchema);
