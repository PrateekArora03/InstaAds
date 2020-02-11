const express = require("express");
const router = express.Router();
const AdPost = require("../models/adPost");
const User = require("../models/user");
const Auth = require("../auth/auth");

router.use(Auth.verToken);
// Post request
router.post("/", async (req, res) => {
  // Set request body author
  req.body.author = req.userId;
  try {
    const post = await AdPost.create(req.body);

    await User.findByIdAndUpdate(
      req.userId,
      { $push: { adPost: post.id } },
      { safe: true, upsert: true, new: true }
    );

    res.status(200).json({
      message: "Ads created successfully! Admin Will contact you soon",
      status: true
    });
  } catch (error) {
    res.status(400).json({ message: "There's an error", status: false, error });
  }
});

// Get single post
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await AdPost.findOne({ _id: postId });
    if (!post) res.json({ message: "Post doesn't found", status: false });
    res.json({ message: "Got the post", status: true, post });
  } catch (error) {
    res.status(401).json({ message: "There's an error", status: false });
  }
});

// Put the post
router.put("/:postid", async (req, res) => {
  try {
    const post = await AdPost.findById(req.params.postid);
    // Checks if the post has same author
    if (post.author._id == req.userId) {
      await AdPost.findByIdAndUpdate(req.params.postid, req.body);
      res.status(200).json({
        message: "Post updated successfully",
        status: "success"
      });
    } else {
      res.status(401).json({ message: "User not authorized", status: false });
    }
  } catch (error) {
    res.status(400).json({ message: "There's an error", status: false, error });
  }
});

// Delete the post
router.delete("/:postid", async (req, res) => {
  try {
    const post = await AdPost.findById(req.params.postid).populate("author");
    const user = await User.findOne({ _id: req.userId });
    console.log(user);
    // Checks if the post has same author
    if (post.author._id == req.userId || user.isAdmin) {
      await AdPost.findByIdAndDelete(req.params.postid);
      const user = await User.findOneAndUpdate(
        { id: post.author.id },
        { $pull: { post: post.id } },
        { new: true }
      );
      res.status(200).json({
        message: "Post deleted successfully",
        status: "success",
        user
      });
    } else {
      res.status(401).json({ message: "User not authorized", status: false });
    }
  } catch (error) {
    res.status(400).json({ message: "There's an error", status: false, error });
  }
});

// Patch the post { like }
router.patch("/:postid/like", async (req, res) => {
  try {
    const post = await AdPost.findById(req.params.postid);
    // Checks if post liked already
    if (post.like.includes(req.userId)) {
      return res.json({ message: "Post liked already", status: false });
    } else {
      const updatePost = await AdPost.findByIdAndUpdate(
        req.params.postid,
        { $push: { like: req.userId } },
        { safe: true, upsert: true, new: true }
      );
      res.status(200).json({
        message: "Post updated successfully",
        status: "success",
        post: updatePost
      });
    }
  } catch (error) {
    res.status(400).json({ message: "There's an error", status: false, error });
  }
});

// Patch the post { unlike }
router.patch("/:postid/unlike", async (req, res) => {
  try {
    const post = await AdPost.findById(req.params.postid);
    // Checks if post liked already
    if (post.like.includes(req.userId)) {
      const updatePost = await AdPost.findByIdAndUpdate(
        req.params.postid,
        { $pull: { like: req.userId } },
        { safe: true, upsert: true, new: true }
      );
      res.status(200).json({
        message: "Post updated successfully",
        status: true,
        post: updatePost
      });
    } else {
      res.json({
        message: "Post doesn't contain any like from current user",
        status: false
      });
    }
  } catch (error) {
    res.status(400).json({ message: "There's an error", status: false, error });
  }
});

// Patch the post view
router.patch("/:postid/view", async (req, res) => {
  try {
    let post = await AdPost.findOne({ _id: req.params.postid });
    // Increment the views
    post.views = post.views + 1;
    post = await post.save();
    res.status(200).json({
      message: "Post updated successfully",
      status: true,
      post
    });
  } catch (error) {
    res.status(400).json({ message: "There's an error", status: false, error });
  }
});

module.exports = router;
