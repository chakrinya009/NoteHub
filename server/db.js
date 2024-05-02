const mongoose = require('mongoose');




mongoose.set('strictQuery', false);   //i added see what it means


const connectToMongoose = (mongooseURL) => {
  mongoose.connect(mongooseURL, () => {
    console.log("Connected to mongoose");
  });
};



module.exports = connectToMongoose;