import { Router } from "express"
const router = Router()

import {
  getEveryCount,
  createCount,
  getAllCounts,
  getSingleCount,
  updateCount,
  deleteCount,
} from "../controller/countController.js"

import {
  validateCreateCountInput,
  validateCountIdParam,
  validateUpdateCountInput,
} from "../middleware/validationMiddleware.js"

router.post("/", validateCreateCountInput, createCount)

router.get("/all-counts/:id", getAllCounts)

router.get("/every-count", getEveryCount)

router.get("/:id", validateCountIdParam, getSingleCount)

router.patch(
  "/:id",
  validateUpdateCountInput,
  validateCountIdParam,
  updateCount
)

router.delete("/:id", validateCountIdParam, deleteCount)

export default router
