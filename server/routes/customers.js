import express from "express";
import {
  getHomePageDetails,
  getTransactionHistory,
  addCustomer,
  deleteCustomer,
  payUdharo,
} from "../controllers/customers.js";
const router = express.Router();

router.route("/").get(getHomePageDetails);
router.route("/:customerId/transactionHistory").get(getTransactionHistory);
router.route("/add").post(addCustomer);
router.route("/:customerId/delete").delete(deleteCustomer);
router.route("/:customerId/repay").post(payUdharo);
export default router;
