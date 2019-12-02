var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Auth = require("../auth/auth");

/* Get current user */
router.get("/", Auth.verToken, (req, res) => {
  const user = req.user;
  user.isAdmin = req.isAdmin ? true : false;
  res.json({ user });
});

/* POST login user. */
router.post("/login", async (req, res) => {
  const { email, username, password } = req.body;
  if (!username && !email)
    return res.status(401).json({
      status: false,
      message: "Enter email or username"
    });
  else if (!password) {
    return res.status(401).json({ status: false, message: "Enter password" });
  }
  User.findOne({ $or: [{ email }, { username }] }, async (err, user) => {
    if (err) return res.status(400).json({ status: false, message: err });
    if (!user)
      return res
        .status(401)
        .json({ status: false, message: "User not register" });
    if (!user.verifyPassword(password)) {
      return res
        .status(401)
        .json({ status: "failed", message: "Invaild password" });
    }

    let token = await Auth.genToken(user.id);

    // Admin login request
    if (email === process.env.email || username === process.env.username) {
      return res.status(200).json({
        status: "success",
        message: "Admin logged in",
        authToken: token
      });
    }
    // User request
    else {
      return res.status(200).json({
        status: "success",
        message: "User logged in",
        authToken: token
      });
    }
  });
});

/* Post register page */
router.post("/register", async (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ status: false, err });
    }
    res.json({ status: "success", message: "User registered", user });
  });
});

module.exports = router;
