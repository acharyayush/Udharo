import express from "express"
import { signup, login, refreshTheToken, logout } from "../controllers/auth.js"
const router = express.Router()
router.post("/signup", signup)
router.post("/login", login)
router.delete("/logout", logout)
router.post("/refresh", refreshTheToken)
export default router;