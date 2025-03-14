import fs from "fs";
import path from "path";
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
import { fileURLToPath } from "url";
dotenv.config();
const app = express();
//Connect to the database
connectDB();

//make uploads directory if it doesn't exist
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    credentials: true,
  })
);
const dirname = path.dirname(fileURLToPath(import.meta.url));
//Initialize the  middlwares
app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(dirname, "uploads")));
app.use(
  "/api/customers/:customerId/products",
  authenticateVendor,
  productRoutes
);
app.use("/api/customers", authenticateVendor, customerRoutes);
app.use("/api/vendor", authenticateVendor, vendorRoutes);
app.use("/auth", authRoutes);
const port = process.env.PORT || 5000;

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
