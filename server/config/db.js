import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to mongodb ");
  } catch (error) {
    console.error(error.message);
    //Exit process wih failure
    process.exit(1);
  }
};
