const mongoose = require("mongoose");

const Workshops = new mongoose.Schema(
  {
    category: { type: String, default: "" },
    workshopTitle: { type: String, default: "" },
    mode: { type: Object },
    city: { type: String, default: "" },
    subLocation: { type: String, default: "" },
    sessionAddress: { type: String, default: "" },
    WFeePerParticipant: { type: String, default: 0 },
    gMapDirection: { type: String, default: "" },
    discription: { type: Array, default: [] },
    WorkshopSlots: { type: Object },
    language: { type: String, default: "" },
    minAge: { type: String, default: "" },
    discount: { type: String, default: 0 },
    YouTubeLink: { type: Object },
    Live: { type: Boolean },
    Pause: { type: Boolean },
    OfferPrice: { type: Number, default: 0 },
    WorkshopImages: { type: [String], required: true },
    terms: { type: Object, default: {} },

  },

  { timestamps: true }
);
module.exports = mongoose.model("Workshop", Workshops);
