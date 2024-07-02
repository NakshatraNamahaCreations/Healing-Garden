const mongoose = require("mongoose");

const TicketRising = new mongoose.Schema(
  {
    issues: { type: String, default: "" },
    categoryImage: { type: String, default: "" },
    ClientId: { type: String, default: "" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ticketsrise", TicketRising);
