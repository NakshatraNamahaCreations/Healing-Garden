const mongoose = require("mongoose");

const tokenBlacklistSchema = new mongoose.Schema({
  token: {
    type: { type: String, default: "" },
    required: true,
    unique: true,
  },
});

const TokenBlacklist = mongoose.model("TokenBlacklist", tokenBlacklistSchema);

module.exports = TokenBlacklist;
