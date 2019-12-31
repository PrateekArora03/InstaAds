const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adPostSchema = new Schema(
  {
    description: { type: String, required: true },
    media: String,
    isImage: { type: Boolean, default: true },
    location: { type: String },
    author: { type: Object, required: true },
    expireDate: { type: Date },
    isApprove: { type: Boolean, default: false },
    like: [{ type: Schema.Types.ObjectId, ref: "User" }],
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Create instance
const AdPost = mongoose.model("AdPost", adPostSchema);

module.exports = AdPost;
