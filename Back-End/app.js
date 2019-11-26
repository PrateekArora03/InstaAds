var express = require("express");
var path = require("path");
var logger = require("morgan");
const mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var adminRouter = require("./routes/admin");
var postRouter = require("./routes/post");
var profileRouter = require("./routes/profile");

// Import dotenv
require("dotenv").config();

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect mongoose
mongoose.connect(
  process.env.MONGOURL || "mongodb://localhost/instaAds",
  { useUnifiedTopology: true, useNewUrlParser: true },
  err => {
    err ? console.log(err) : console.log("success mongodb connected");
  }
);

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

app.use("/api/timeline", indexRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/post", postRouter);
app.use("/api/profile", profileRouter);

module.exports = app;
