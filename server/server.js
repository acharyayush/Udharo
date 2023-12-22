import express from "express";
import { connectDB } from "./config/db";

const app = express();

//Connect to the database
connectDB();

//Initialize the  middlwares
app.use(express.json({ extended: false }));

const port = process.env.PORT || 5000;

//Define the routes

//Listen to the port
app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
