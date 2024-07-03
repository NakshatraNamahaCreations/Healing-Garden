const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
  {
    usertype: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    phone: { type: Number, default: "" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Client", ClientSchema);
