const express = require("express");
const router = express.Router();

const Auth = require("../auth/auth");
const User = require("../models/user");
const adPost = require("../models/adPost");
const Post = require("../models/post");

// Verify the token
router.use(Auth.verToken);

// Get dashboard
router.get("/dashboard", async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const posts = await Post.find({ isApprove: false }).sort({ createdAt: -1 });
      const adPosts = await adPost.find({ isApprove: false }).sort({ createdAt: -1 });
      return res.json({ message: "Request success", status: true, adPosts, posts});
    } else {
      res.status(401).json({ message: "User not authorized" });
    }
  } catch (error) {
    return res.json({ message: "There's error", status: false, error })
  }
});

// Patch post
router.patch("/post/:postid", (req, res) => {
  // Checks if the user is admin
  if (req.user.isAdmin) {
    Post.findByIdAndUpdate(
      req.params.postid,
      { isApprove: true },
      (error, post) => {
        if (error)
          return req.json({
            message: "There's an error",
            status: "failed",
            error
          });
        res
          .status(200)
          .json({ message: "Post approved successfully", status: "success" });
      }
    );
  } else {
    res.status(401).json({ message: "User not authorized", status: "failed" });
  }
});

//Home Banner route
router.post("/banner", async (req, res) => {
  if (req.user.isAdmin) {
    try {
      if (req.body.carousel) {
        let { carousel } = req.body.carousel;
        const admin = await User.findOneAndUpdate(
          { isAdmin: true },
          { homeBanner: { carousel, toggle: "carousel" } }
        );
        res.json({ status: true, message: "Banner Updated!" });
      } else {
        let { video } = req.body.video;
        const admin = await User.findOneAndUpdate(
          { isAdmin: true },
          { homeBanner: { video, toggle: "video" } }
        );
        res.json({ status: true, message: "Video Updated!" });
      }
    } catch (error) {
      res.json({ status: false, error });
    }
  } else {
    res.json({ status: false, message: "unauthorized User" });
  }
});

router.get("/banner", async (req, res) => {
  try {
    const admin = await User.findOne({ isAdmin: true });
    res.json({ status: true, Ads: admin.homeBanner });
  } catch (error) {
    res.json({ status: false, error });
  }
});

module.exports = router;
