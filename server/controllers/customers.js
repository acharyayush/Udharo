import Vendor from "../models/Vendor.js";
import Customer from "../models/Customer.js";
const getHomePageDetails = async (req, res, next) => {
  try {
    //get vendor with all customers
    const id = req.params.id;
    const vendorDetail = await Vendor.findById(
      id,
      "firstName lastName customers"
    ).populate({
      path: "customers",
      select: "firstName lastName lastModified avatar udharoLeft",
    });
    if (!vendorDetail) {
      return res
        .status(404)
        .json({ message: "Vendor Not Found 🤷‍♂️", status: "error" });
    }
    const totalUdharo = vendorDetail.customers?.reduce(
      (total, { udharoLeft }) => total + udharoLeft,
      0
    );
    res.json({ ...vendorDetail.toObject(), totalUdharo });
  } catch (err) {
    next(err);
  }
};
const getTransactionHistory = async (req, res, next) => {
  try {
    const { id:vendorId, customerId } = req.params;
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
    const vendorId = req.params.id;
    const customerDetail = { ...req.body, associatedVendor: vendorId };
    const customer = await Customer.create(customerDetail);
    await Vendor.findByIdAndUpdate(
      vendorId,
      { $push: { customers: customer.id } },
    );
    res
      .status(201)
      .json({ message: "New customer is created 😁", status: "success" });
  } catch (err) {
    next(err);
  }
};
const deleteCustomer = async (req, res, next) => {
  try {
    const {id:vendorId, customerId} = req.params;
    const { firstName, lastName } = await Customer.findByIdAndDelete(
      customerId
    );
    const deletedCustomer = await Vendor.findByIdAndUpdate(vendorId, {
      $pull: { customers: customerId },
    });
    if (!deletedCustomer) {
      return res
        .status(404)
        .json({ message: "Customer does not exist 🤷‍♂️", status: "error" });
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
    const { id:vendorId, customerId } = req.params;
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
    customer.save();

    res.json({
      message: `Udharo paid, NPR. ${amount}😁`,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export {
  getHomePageDetails,
  getTransactionHistory,
  addCustomer,
  deleteCustomer,
  payUdharo,
};
