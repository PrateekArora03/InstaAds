const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("./../models/post");
const Auth = require("../auth/auth");

// Protect the route
router.use(Auth.verToken);

// Get user
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne(
      { username: req.params.username },
      "-password -__v -createdAt -updatedAt -isAdmin"
    )
      .populate({
        path: "post",
        populate: {
          path: "author",
          select:
            "-password -createdAt -updatedAt -__v -post -adPost -isAdmin -_id -email -username"
        }
      })
      .populate({
        path: "adPost",
        populate: {
          path: "author",
          select:
            "-password -createdAt -updatedAt -__v -post -adPost -isAdmin -_id -email -username"
        }
      });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not register", status: false });
    }
    res
      .status(200)
      .json({ message: "User found successfully", status: true, user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "There's an error", status: false, error });
  }
});

// Update Profile
router.put("/:username", async (req, res) => {
  try {
    const profile = await User.findOne(
      { username: req.params.username },
      { new: true }
    );
    // Checks if the current user is logged in
    if (profile._id == req.userId) {
      const updateProfile = await User.findOneAndUpdate(
        { username: req.params.username },
        req.body,
        { new: true }
      ).select("-password");

      res.status(200).json({
        message: "Profile updated successfully",
        status: "success",
        user: updateProfile
      });
    } else {
      res.status(401).json({ message: "User not authorized", status: false });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "There's an error", status: "failed", error });
  }
});

module.exports = router;
