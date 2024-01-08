import Customer from "../models/Customer.js";
const getProductsAndUdharo = async (req, res, next) => {
  try {
    const productsAndUdharo = await Customer.findOne(
      { _id: req.customerId, associatedVendor: req.id },
      "-lastModified -transactionHistory -associatedVendor"
    );
    const grandTotal = productsAndUdharo.products?.reduce(
      (accumulator, currentProduct) =>
        accumulator + currentProduct.quantity * currentProduct.unitPrice,
      0
    );
    res.json({ ...productsAndUdharo.toObject(), grandTotal });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
const addProduct = async (req, res, next) => {
  try {
    //add products, add to transaction history and update udharo status too..
    const { quantity, unitPrice, name } = req.body;
    const amount = quantity * unitPrice;
    const remark = `Bought ${quantity} ${name} each of NPR ${unitPrice}`;
    const action = "BUY";
    const date = Date.now();
    const newTransaction = { remark, action, amount, date };
    await Customer.findOneAndUpdate(
      { _id: req.customerId, associatedVendor: req.id },
      {
        $push: { products: req.body, transactionHistory: newTransaction },
        $inc: { udharoLeft: amount },
      }
    );
    res.json({ message: "Product added successfully ✌️", status: "success" });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { products } = await Customer.findOne(
      {
        _id: req.customerId,
        associatedVendor: req.id,
      },
      "products"
    );
    const { name, unitPrice, quantity } = products.find(
      (product) => product.id === productId
    );
    const amount = unitPrice * quantity;
    const remark = `Deleted ${quantity} ${name} each of NPR ${unitPrice}`;
    const action = "DELETE";
    const date = Date.now();
    const newTransaction = { remark, action, amount, date };

    const deletedProduct = await Customer.findOneAndUpdate(
      { _id: req.customerId, associatedVendor: req.id },
      {
        $pull: {
          products: { _id: productId },
        },
        $inc: { udharoLeft: -amount },
        $push: { transactionHistory: newTransaction },
      }
    );

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product does not exist 🤷‍♂️",
        status: "error",
      });
    }
    res.json({ message: "Product deleted successfully ✌️", status: "success" });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
export { getProductsAndUdharo, addProduct, deleteProduct };
