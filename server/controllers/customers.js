import Vendor from "../models/Vendor.js";
import Customer from "../models/Customer.js";
import fs from "fs";
import path from "path";
const getHomePageDetails = async (req, res, next) => {
  try {
    //get vendor with all customers
    const id = req.id;
    const customerDetail = await Vendor.findById(
      id,
      "firstName lastName customers"
    ).populate({
      path: "customers",
      select: "firstName lastName lastModified image udharoLeft",
    });
    if (!customerDetail) {
      return res
        .status(404)
        .json({ message: "Vendor Not Found 🤷‍♂️", status: "error" });
    }
    const totalUdharo = customerDetail.customers?.reduce(
      (total, { udharoLeft }) => total + udharoLeft,
      0
    );
    res.json({ ...customerDetail.toObject(), totalUdharo });
  } catch (err) {
    next(err);
  }
};
const getTransactionHistory = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const vendorId = req.id;
    const { transactionHistory } = await Customer.findOne({
      _id: customerId,
      associatedVendor: vendorId,
    });
    res.json(transactionHistory.reverse());
  } catch (err) {
    next(err);
  }
};
const addCustomer = async (req, res, next) => {
  try {
    const vendorId = req.id;
    const customerDetail = {
      ...req.body,
      associatedVendor: vendorId,
      image: req.file?.filename || "",
    };
    const customer = await Customer.create(customerDetail);
    await Vendor.findByIdAndUpdate(vendorId, {
      $push: { customers: customer.id },
    });
    res
      .status(201)
      .json({ message: "New customer is created 😁", status: "success" });
  } catch (err) {
    next(err);
  }
};
const deleteCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const vendorId = req.id;
    const { firstName, lastName, image } = await Customer.findByIdAndDelete(
      customerId
    );
    const vendor = await Vendor.findByIdAndUpdate(vendorId, {
      $pull: { customers: customerId },
    });
    try {
      if (image) await fs.promises.unlink(path.join("./uploads", image));
    } catch (cleanUpErr) {
      res.json({
        status: "error",
        message: "Could not clean up customer image",
      });
    }
    res.json({
      message: `Deleted Customer, ${firstName} ${lastName} 😁`,
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};
const payUdharo = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const vendorId = req.id;
    const { amount } = req.body;
    const remark = `Repaid NPR ${amount}`;
    const action = "REPAY";
    const date = Date.now();
    const newTransaction = { remark, action, amount, date };

    const customer = await Customer.findOne({
      _id: customerId,
      associatedVendor: vendorId,
    });
    if (customer.udharoLeft < amount)
      return res.json({
        message: "Repay amount cannot be greater than udharo left",
        status: "error",
      });
    customer.udharoLeft = Number(customer.udharoLeft) - Number(amount);
    customer.udharoPaid = Number(customer.udharoPaid) + Number(amount);
    customer.transactionHistory.push(newTransaction);
    await customer.save();

    res.json({
      message: `Udharo paid, NPR. ${amount}😁`,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const uploadCustomerImage = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    if (!req.id || !req.file?.filename) {
      throw new Error(`No ${!req.id ? "customer id" : "filename"} found`);
    }
    const { image: customerImage } = await Customer.findByIdAndUpdate(
      customerId,
      { image: req.file.filename }
    ).select("image");
    try {
      if (customerImage) {
        await fs.promises.unlink(
          path.join(req.file.destination, customerImage)
        );
      }
    } catch (err) {
      console.log("Error cleaning up previous customer image");
      next(err);
    }
    res
      .status(200)
      .json({
        message: "customer image uploaded successfully",
        path: req.file.filename,
      });
  } catch (err) {
    try {
      if (req.file?.path) await fs.promises.unlink(req.file.path);
    } catch (cleanupErr) {
      console.log("Could not clean clean up the customer image");
    } finally {
      next(err);
    }
  }
};
export {
  getHomePageDetails,
  getTransactionHistory,
  addCustomer,
  deleteCustomer,
  payUdharo,
  uploadCustomerImage,
};
