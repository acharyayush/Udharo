import path from "path";
import Vendor from "../models/Vendor.js";
import fs from "fs";
export const getVendorProfile = async (req, res, next) => {
  try {
    if(!req.id)
        throw new Error("Error finding id")
    const profile = await Vendor.findById(req.id, "id firstName lastName email avatar");
    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
};
export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.id || !req.file?.filename) {
      throw new Error(`No ${!req.id ? "vendor id" : "filename"} found`);
    }
    const {avatar} = await Vendor.findByIdAndUpdate(req.id, { avatar: req.file.filename }).select("avatar");
    try{
      if(avatar){
        await fs.promises.unlink(path.join(req.file.destination, avatar))
      }
    }catch(err){
      console.log("Error cleaning up previous vendor's avatar")
      next(err)
    }
    res
      .status(200)
      .json({ message: "vendor's avatar uploaded successfully", path: req.file.filename });
  } catch (err) {
    try {
      if (req.file?.path) await fs.promises.unlink(req.file.path);
    } catch (cleanupErr) {
      console.log("Could not clean up the vendor's avatar");
    } finally {
      next(err);
    }
  }
};
