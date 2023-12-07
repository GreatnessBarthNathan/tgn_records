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
  validateCountInput,
  validateCountIdParam,
} from "../middleware/validationMiddleware.js"

router.post("/", validateCountInput, createCount)

router.get("/all-counts/:id", getAllCounts)

router.get("/every-count", getEveryCount)

router.get("/:id", validateCountIdParam, getSingleCount)

router.patch("/:id", validateCountInput, validateCountIdParam, updateCount)

router.delete("/:id", validateCountIdParam, deleteCount)

export default router
