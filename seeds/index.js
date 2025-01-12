const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities"); // Import the cities array

const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true, // Use for Mongoose v6+
  useUnifiedTopology: true, // Use for Mongoose v6+
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database Connected");
});
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({}); // Clear all existing campgrounds

  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000); // Generate a random index for cities
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`, // Accessing the cities array
      title: `${sample(descriptors)} ${sample(places)}`,
    });
    await camp.save(); // Save the campground to the database
  }
};

seedDB().then(() => {
  mongoose.connection.close(); //close the database connection
});
