import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
    unique: true,
  },
  udharoLeft: {
    type: Number,
    default: 0,
  },
  udharoPaid: {
    type: Number,
    default: 0,
  },
  associatedVendor: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
  },
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        min: 1,
        default: 1,
      },
      unitPrice: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  transactionHistory: [
    {
      remark: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      action: {
        type: String,
        enum: ["BUY", "REPAY", "DELETE"],
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

customerSchema.pre("save", function (next) {
  this.lastModified = Date.now();
  next();
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
