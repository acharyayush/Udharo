import express from "express"
import {getVendorProfile, uploadAvatar} from "../controllers/vendors.js"
import upload from "../middlewares/uploadImage.js"
import reduceSize from "../middlewares/reduceSize.js"
const router = express.Router()
router.get("/profile", getVendorProfile)
router.post("/profile/upload-avatar", upload.single("avatar"), reduceSize, uploadAvatar)
export default router;