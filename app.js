const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const postRouter = require("./routes/post");
const adPostRouter = require("./routes/ad_post");
const profileRouter = require("./routes/profile");
const carouselRouter = require("./routes/carousel");

// Import dotenv
require("dotenv").config();

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
//Set static folder
app.use(express.static("client/build"));

// Connect mongoose
mongoose.connect(
  process.env.MONGOURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.log(err);
    } else {
      require("./utils/seed.js");
      console.log("success mongodb connected");
    }
  }
);

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

app.use("/api/timeline", indexRouter);
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/post", postRouter);
app.use("/api/adpost", adPostRouter);
app.use("/api/profile", profileRouter);
app.use("/api/carousel", carouselRouter);

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

module.exports = app;
