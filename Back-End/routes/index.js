var express = require("express");
var router = express.Router();
const Post = require("../models/post");
const Auth = require("../auth/auth");

// Verify the token
router.use(Auth.verToken);

/* GET home page. */
router.get("/", async (req, res) => {
  // TODO: show user timeline based on current location of user
  try {
    const posts = await Post.find({ isApprove: true }).sort({ createdAt: -1 });
    res.json({ message: "Got the posts", status: "success", posts });
  } catch (error) {
    res.status(401).json({ message: "There's an error", status: "failed" });
  }
});

module.exports = router;
