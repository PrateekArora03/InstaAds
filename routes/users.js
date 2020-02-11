var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Auth = require("../auth/auth");

/* Get current user */
router.get("/", Auth.verToken, async (req, res) => {
  const user = await User.findOne(
    { _id: req.userId },
    "-password -__v -createdAt -updatedAt"
  );
  res.json({ user });
});

/* POST login user. */
router.post("/login", async (req, res) => {
  const { email, username, password } = req.body;
  if (!username && !email)
    return res.json({
      status: false,
      message: "Enter email or username"
    });
  else if (!password) {
    return res.json({ status: false, message: "Enter password" });
  }
  User.findOne({ $or: [{ email }, { username }] }, async (err, user) => {
    if (err) return res.status(400).json({ status: false, message: err });
    if (!user) return res.json({ status: false, message: "User not register" });
    if (!user.verifyPassword(password)) {
      return res.json({ status: false, message: "Invaild password" });
    }

    let token = await Auth.genToken(user.id);

    return res.status(200).json({
      status: "success",
      message: "User logged in",
      authToken: token
    });
  });
});

/* Post register page */
router.post("/register", async (req, res) => {
  let { email, password, name, username } = req.body;
  if (!email && !password && !name && !username) {
    return res.json({
      status: false,
      message: "Please fill all required details."
    });
  }
  User.findOne({ email }, async (err, user) => {
    if (user) {
      return res.json({
        status: false,
        message: "Email already exist!"
      });
    }
  });
  User.findOne({ username }, async (err, user) => {
    if (user) {
      return res.json({
        status: false,
        message: "Username already exist!"
      });
    }
  });
  User.create(req.body, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ status: false, err });
    }
    user.password = "";
    res.json({ status: "success", message: "User registered", user });
  });
});

module.exports = router;
