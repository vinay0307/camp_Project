const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});

const db = mongoose.connection; // this is th elogic to check if our database is connected
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Databse Connected");
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});

app.listen(3001, () => {
  console.log("serving on port 3001");
});
