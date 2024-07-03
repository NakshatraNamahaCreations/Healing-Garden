const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    category: { type: String, default: "" },
    subcategoryImage: { type: String, default: "" },
    invoiceName: { type: String, default: "" },
    subcategory: { type: String, default: "" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("subcategory", subCategorySchema);
