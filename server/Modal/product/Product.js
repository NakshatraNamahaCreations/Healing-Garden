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
    Live: { type: String },
    Pause: { type: Boolean },
    OfferPrice: { type: Number, default: 0 },
    WorkshopImages: { type: [String], required: true },
    terms: { type: Array, default: [] },
    clientType: { type: String, default: "" },
    reasonToJoin: { type: Array, default: [] },
    primaryObjective: { type: Array, default: [] },
    SuitableFor: { type: Array, default: [] },
    Maxparticipant: { type: Number, default: 0 },
    Minparticipant: { type: Number, default: 0 },
  },

  { timestamps: true }
);
module.exports = mongoose.model("Workshop", Workshops);
