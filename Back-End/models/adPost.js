const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adPostSchema = new Schema(
  {
    description: { type: String, required: true },
    location: { type: String, required: true },
    author: { type: Object, required: true },
    expireDate: { type: Date, required: true },
    isApprove: { type: Boolean, default: false },
    // comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    like: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // views: { type: Schema.Types.ObjectId, ref: "AdView" }
    views: { type: Number, default: 0, required: true }
  },
  { timestamps: true }
);

// Create instance
const AdPost = mongoose.model("AdPost", adPostSchema);

module.exports = AdPost;
