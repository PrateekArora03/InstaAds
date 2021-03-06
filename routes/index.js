var express = require("express");
var router = express.Router();

const Post = require("../models/post");
const AdPost = require("../models/adPost");

/* GET home page. */
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({ isApprove: true })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("author");
    const ads = await AdPost.find({
      isApprove: true,
      expireDate: { $gte: Date.now() }
    })
      .sort({ createdAt: -1 })
      .limit(6)
      .populate("author");
    res.json({ message: true, status: true, posts, ads });
    await posts.forEach(async post => {
      const data = await Post.findOne({ _id: post._id });
      data.views = data.views + 1;
      data.save();
    });
    await ads.forEach(async ad => {
      const data = await AdPost.findOne({ _id: ad._id });
      data.views = data.views + 1;
      data.save();
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "There's an error", status: false });
  }
});

module.exports = router;
