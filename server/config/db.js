import mongoose from "mongoose";
import config from "config";

// mongo db compass connection string :
const db = "mongodb://127.0.0.1:27017/udharos";
// const db = config.get("mongoURI");

export const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("Connected to mongodb ");
  } catch (error) {
    console.error(error.message);
    //Exit process wih failure
    process.exit(1);
  }
};
