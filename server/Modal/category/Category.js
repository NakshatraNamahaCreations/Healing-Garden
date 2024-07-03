const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    category: { type: String, default: "" },
    categoryImage: { type: String, default: "" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", CategorySchema);
