import express from "express";
import { connectDB } from "./config/db.js";
import cors from "cors";
import customerRoutes from "./routes/customers.js";
import productRoutes from "./routes/products.js";
import vendorRoutes from "./routes/vendors.js";
import authRoutes from "./routes/auth.js";
import errorHandler from "./middlewares/errorHandler.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authenticateVendor from "./middlewares/authenticateVendor.js";
dotenv.config();
const app = express();
//Connect to the database
connectDB();
//CORS-enabled for all origins
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL || "http://localhost:3000",
    credentials: true,
  })
);
//Initialize the  middlwares
app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(
  "/api/:id/customers",
  authenticateVendor,
  customerRoutes
);
app.use(
  "/api/:id/customers/:customerId/products",
  authenticateVendor,
  (req, res, next) => {
    req.id = req.params.id;
    req.customerId = req.params.customerId;
    next();
  },
  productRoutes
);
app.use("/api/vendor/", authenticateVendor, vendorRoutes);
app.use("/auth", authRoutes);
const port = process.env.PORT || 5000;

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
