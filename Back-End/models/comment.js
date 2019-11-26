const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const commentSchema = Schema(
  {
    body: { type: String, required: true },
    author: [{ type: Schema.Types.ObjectId, ref: "User" }],
    post: [{ type: Schema.Types.ObjectId, ref: "Post" }]
  },
  { timestamps: true }
);

// Create comment instace
const Comment = mongoose.model("Comment", commentSchema);

// Export the comment model
module.exports = Comment;
