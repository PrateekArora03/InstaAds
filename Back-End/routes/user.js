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
router.post("/login", (req, res) => {
  const { email, username, password } = req.body;
  if (!username && !email)
    return res
      .status(401)
      .json({ message: "Please enter either email or username" });
  else if (!password) {
    return res.status(401).json({ message: "Please enter password" });
  }
  User.findOne({ $or: [{ email }, { username }] }, async (err, user) => {
    if (err) return res.status(400).json({ message: err });
    if (!user)
      return res
        .status(401)
        .json({ status: "failed", message: "Invaild credentials" });
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
        token,
        isInstaAdmin: true
      });
    }
    // User request
    else {
      return res
        .status(200)
        .json({ status: "success", message: "User logged in", token });
    }
  });
});

/* Post register page */
router.post("/register", (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) return res.status(400).json({ message: err });
    res.json({ status: "success", message: "User registered", user });
  });
});

module.exports = router;
