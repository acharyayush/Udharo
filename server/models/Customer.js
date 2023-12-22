import mongoose from "mongoose";

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
  avatar: {
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
      remarks: {
        type: String,
        required: true,
      },

      action: {
        type: String,
        enum: ["BUY", "PAY", "DELETE"],
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
module.exports = Customer;
