const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  { 
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    desc: { type: String, default: "" },
    blogimage: { type: String, default: "" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("blog", subCategorySchema);
