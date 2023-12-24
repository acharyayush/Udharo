import express from "express";
import { connectDB } from "./config/db.js";
import cors from "cors";
import customerRoutes from "./routes/customers.js";
const app = express();
//Connect to the database
connectDB();

//CORS-enabled for all origins
app.use(cors());
//Initialize the  middlwares
app.use(express.json({ extended: false }));
app.use(
  "/api/:id/customers",
  (req, res, next) => {
    req.id = req.params.id;
    next();
  },
  customerRoutes
);

const port = process.env.PORT || 5000;

//Define the routes

//Listen to the port
app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
