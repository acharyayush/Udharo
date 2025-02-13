import mongoose from "mongoose";
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
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
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  customers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
  ],
});

const Vendor = mongoose.model("Vendor", vendorSchema);
export default Vendor;
