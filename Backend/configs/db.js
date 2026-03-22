const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("Connected to DB");
  } catch (err) {
    console.log("Mongodb err: ", err.message);
    throw err;
  }
};

module.exports = connectDB;
