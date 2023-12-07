import { Router } from "express"
import {
  createRcFinance,
  getAllRcFinance,
  getSingleRcFinance,
  updateRcFinance,
  deleteRcFinance,
} from "../controller/rcFinanceController.js"

import { validateRcFinanceInput } from "../middleware/validationMiddleware.js"

const router = Router()

router.post("/", validateRcFinanceInput, createRcFinance)

router.get("/", getAllRcFinance)

router.get("/:id", getSingleRcFinance)

router.patch("/:id", validateRcFinanceInput, updateRcFinance)

router.delete("/:id", deleteRcFinance)

export default router
