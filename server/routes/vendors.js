import express from "express"
import {getVendorProfile} from "../controllers/vendors.js"
const router = express.Router()
router.get("/profile", getVendorProfile)
export default router;