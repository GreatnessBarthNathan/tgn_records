import { Router } from "express"
import {
  createTen,
  getAllTen,
  getSingleTen,
  updateTen,
  deleteTen,
} from "../controller/tenController.js"

import { validateTenInput } from "../middleware/validationMiddleware.js"

const router = Router()

router.post("/", validateTenInput, createTen)
router.get("/", getAllTen)
router.get("/:id", getSingleTen)
router.patch("/:id", validateTenInput, updateTen)
router.delete("/:id", deleteTen)

export default router
