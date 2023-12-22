import mongoose from "mongoose";
import config from "config";

const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("COnnected to mongodb ");
  } catch (error) {
    console.error(error.message);
    //Exit process wih failure
    process.exit(1);
  }
};

module.exports = connectDB;
