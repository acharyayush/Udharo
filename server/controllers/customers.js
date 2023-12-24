import Vendor from "../models/Vendor.js";
import Customer from "../models/Customer.js";
const getHomePageDetails = async (req, res, next) => {
  try {
    //get vendor with all customers
    const vendorDetail = await Vendor.findById(
      req.id,
      "firstName lastName totalUdharo customers"
    ).populate({
      path: "customers",
      select: "firstName lastName lastModified avatar udharoLeft",
    });
    res.json(vendorDetail);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const addCustomer = async (req, res, next) => {
  try {
    //validate customer req.body

    //add to database
    const customer = await Customer.create(req.body);
    const newCustomers = await Vendor.findByIdAndUpdate(
      req.id,
      { $push: { customers: customer.id } },
      { new: true, select: "customers" }
    );
    res.json(newCustomers);
  } catch (err) {
    next(err);
  }
};
const deleteCustomer = async (req, res, next) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(
      req.params.customerId
    );
    res.json(deletedCustomer);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export { getHomePageDetails, addCustomer, deleteCustomer };
