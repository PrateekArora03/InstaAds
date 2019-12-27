const express = require("express");
const router = express();
const Ad = require("./../models/ad");
const auth = require("./../auth/auth");

//Home Banner route
router.patch("/", auth.verToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const ads = await Ad.find({});
      await Ad.findOneAndUpdate(
        { _id: ads[0]._id },
        { homeBanner: req.body },
        { new: true }
      );
      return res.status(201).json({
        status: "success",
        message: `carousel Update to ${req.body.toggle}`
      });
    } catch (error) {
      return res.status(400).json({ status: false, error });
    }
  } else {
    res.json({ status: false, message: "unauthorized User" });
  }
});

//
router.get("/", async (req, res) => {
  try {
    const ads = await Ad.find({});
    res.status(200).json({ status: "success", ads: ads[0].homeBanner });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, error });
  }
});

module.exports = router;
