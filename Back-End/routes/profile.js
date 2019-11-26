const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Auth = require("../auth/auth");

// Protect the route
router.use(Auth.verToken);

// Get user
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne(
      { username: req.params.username },
      "-password"
    );
    if (!user) {
      return res
        .status(404)
        .json({ message: "User does't exist", status: "failed" });
    }
    res
      .status(200)
      .json({ message: "User found successfully", status: "success", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "There's an error", status: "failed", error });
  }
});

// Put username
router.put("/:username", async (req, res) => {
  try {
    const profile = await User.findOne({ username: req.params.username });
    // Checks if the current user is logged in
    if (profile._id == req.user.id) {
      const updateProfile = await User.findOneAndUpdate(
        { username: req.params.username },
        req.body
      );
      res.status(200).json({
        message: "Profile updated successfully",
        status: "success"
      });
    } else {
      res
        .status(401)
        .json({ message: "User not authorized", status: "failed" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "There's an error", status: "failed", error });
  }
});

module.exports = router;
