import Vendor from "../models/Vendor.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validateForm from "../utils/validateForm.js";
import { generateJWT, setTokensInCookies } from "../utils/jwtUtils.js";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/index.js";
export const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const formData = { firstName, lastName, email, phone, password };
    const { message, status } = validateForm(formData);
    if (status === "error") {
      res.status(400).json({ message, status });
    } else {
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      formData.password = hashedPassword;
      const newVendor = new Vendor(formData);
      const { id } = newVendor;
      const newAccessToken = generateJWT({ id, email }, ACCESS_TOKEN);
      const newRefreshToken = generateJWT({ id, email }, REFRESH_TOKEN);
      newVendor.refreshToken = await bcrypt.hash(newRefreshToken, 10);
      newVendor.save();
      setTokensInCookies(res, newAccessToken, newRefreshToken);
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
    const newAccessToken = generateJWT(
      { id: vendor.id, email: vendor.email },
      ACCESS_TOKEN
    );
    const newRefreshToken = generateJWT(
      { id: vendor.id, email: vendor.email },
      REFRESH_TOKEN
    );
    await Vendor.findByIdAndUpdate(vendor.id, {
      refreshToken: await bcrypt.hash(newRefreshToken, 10),
    });
    setTokensInCookies(res, newAccessToken, newRefreshToken);
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
export const logout = async (req, res) => {
  const id = req.id;
  try {
    await Vendor.findByIdAndUpdate(id, { refreshToken: "" });
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/auth/refresh",
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
export const refreshTheToken = async (req, res) => {
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized", tokenStatus: "empty" });
  }
  try {
    const { id } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const vendor = await Vendor.findById(id);
    if (!vendor) {
      throw new Error();
    }
    const newAccessToken = generateJWT(
      { id: vendor.id, email: vendor.email },
      ACCESS_TOKEN
    );
    //set access token only and leave refresh token as it is
    setTokensInCookies(res, newAccessToken, null);
    return res.status(200).send({ message: "successfull token refresh" });
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};
