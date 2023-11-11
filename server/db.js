const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongo = () => {
  mongoose.connect(process.env.mongoUrl, () => {
    console.log("connected to db successfully");
  });
};

module.exports = connectToMongo;
