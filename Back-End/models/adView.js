const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adViewSchema = Schema(
  {
    count: { type: Number, default: 0 },
    adPost: { type: Schema.Types.ObjectId, ref: "AdPost" }
  },
  { timestamps: true }
);

const AdView = mongoose.model("AdView", adViewSchema);

module.exports = AdView;
