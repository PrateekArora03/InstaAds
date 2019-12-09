const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postViewSchema = Schema(
  {
    count: { type: Number, default: 0 },
    post: { type: Schema.Types.ObjectId, ref: "Post" }
  },
  { timestamps: true }
);

const PostView = mongoose.model("PostView", postViewSchema);

module.exports = PostView;
