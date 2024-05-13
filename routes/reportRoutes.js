import { Router } from "express"

import {
  createReport,
  getAllReports,
  getSingleReport,
  updateReport,
  deleteReport,
} from "../controller/reportController.js"

import { validateReportInput } from "../middleware/validationMiddleware.js"

const router = Router()

router.post("/", validateReportInput, createReport)

router.get("/", getAllReports)

router.get("/:id", getSingleReport)

router.patch("/:id", validateReportInput, updateReport)

router.delete("/:id", deleteReport)

export default router
