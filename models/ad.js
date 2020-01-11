const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const adsSchema = Schema({
  homeBanner: {
    carousel: {
      A: { type: String },
      B: { type: String },
      C: { type: String },
      D: { type: String }
    },
    video: { type: String },
    toggle: {
      type: String,
      enum: ["image", "video"]
    }
  }
});

// Create comment instace
const ad = mongoose.model("ad", adsSchema);

// Export the comment model
module.exports = ad;
