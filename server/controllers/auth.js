import Vendor from "../models/Vendor.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const validateForm = (formData) => {
  let message = "";
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\d{10}$/;
  const { firstName, lastName, email, phone, password } = formData;
  if (!firstName?.trim() || !lastName?.trim())
    message = "Must have first name and last name";
  else if (!emailRegex.test(email)) message = "Invalid email";
  else if (!phoneRegex.test(phone))
    message = "Phone number must be of 10 digits";
  else if (password?.length < 8)
    message = "Password must be at least 8 characters long";
  if (message === "") {
    return { status: "success" };
  } else {
    return { status: "error", message };
  }
};
const generateJWT = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
};
export const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const formData = { firstName, lastName, email, phone, bcrypt, password };
    const { message, status } = validateForm(formData);
    if (status === "error") {
      res.status(400).json({ message, status });
    } else {
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      formData.password = hashedPassword;
      const newVendor = await Vendor.create(formData);
      const { id, firstName, lastName, email } = newVendor;
      const token = generateJWT({ id, email });
      res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production"
      });
      res.status(200).json({ id, firstName, lastName, email });
    }
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email?.trim() || !password?.trim()) {
      res
        .status(400)
        .json({ message: "Please enter email and password", status: "error" });
      return;
    }
    const vendor = await Vendor.findOne({ email });
    let isPasswordValid = false;
    if (vendor) {
      isPasswordValid = await bcrypt.compare(password, vendor.password);
    }
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid Credentials", status: "error" });
      return;
    }
    const token = generateJWT({ id: vendor.id, email: vendor.email });
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({
      id: vendor.id,
      email: vendor.email,
      firstName: vendor.firstName,
      lastName: vendor.lastName,
    });
  } catch (err) {
    next(err);
  }
};
