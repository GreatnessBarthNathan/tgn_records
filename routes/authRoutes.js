import { Router } from "express"
import {
  register,
  login,
  logoutUser,
  forgotPassword,
} from "../controller/authController.js"

import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js"

import rateLimiter from "express-rate-limit"
const apiLimiter = rateLimiter({
  windowMs: 1000 * 60 * 15,
  max: 15,
  message: { msg: "IP rate limit exceeded, retry in 15mins" },
})

const router = Router()

router.post("/register", apiLimiter, validateRegisterInput, register)

router.post("/login", apiLimiter, validateLoginInput, login)

router.get("/logout", logoutUser)

router.patch("/forgot-password", forgotPassword)

export default router
