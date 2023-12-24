import express from "express";
import {
  getHomePageDetails,
  addCustomer,
  deleteCustomer,
} from "../controllers/customers.js";
const router = express.Router();

router.route("/").get(getHomePageDetails);
router.route("/add").post(addCustomer);
router.route("/:customerId/delete").delete(deleteCustomer);
export default router;
