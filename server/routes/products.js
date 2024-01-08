import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductsAndUdharo,
} from "../controllers/products.js";
const router = express.Router();
router.route("/").get(getProductsAndUdharo);
router.route("/add").post(addProduct);
router.route("/:productId/delete").delete(deleteProduct);
export default router;
