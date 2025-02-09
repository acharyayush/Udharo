import express from "express";
import upload from "../middlewares/uploadImage.js";
import {
  getHomePageDetails,
  getTransactionHistory,
  addCustomer,
  deleteCustomer,
  payUdharo,
  uploadCustomerImage,
} from "../controllers/customers.js";
const router = express.Router({ mergeParams: true });

router.route("/").get(getHomePageDetails);
router.route("/:customerId/transactionHistory").get(getTransactionHistory);
router.route("/add").post(upload.single("customerImage"), addCustomer);
router.route("/:customerId/delete").delete(deleteCustomer);
router.route("/:customerId/repay").post(payUdharo);
router
  .route("/:customerId/profile/upload-customer-image")
  .post(upload.single("customerImage"), uploadCustomerImage);
export default router;
