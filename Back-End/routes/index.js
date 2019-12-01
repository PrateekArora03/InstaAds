var express = require("express");
var router = express.Router();
const Post = require("../models/post");
const Auth = require("../auth/auth");

// Verify the token
router.use(Auth.verToken);

/* GET home page. */
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({ isApprove: true })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json({ message: "Got the posts", status: true, posts });
  } catch (error) {
    res.status(401).json({ message: "There's an error", status: false });
  }
});

module.exports = router;
