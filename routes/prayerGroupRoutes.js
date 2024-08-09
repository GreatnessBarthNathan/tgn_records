import { Router } from "express"
import {
  createNewRecord,
  allGroupRecords,
} from "../controller/prayerGroupController.js"
import { validateGroupInput } from "../middleware/validationMiddleware.js"

const router = Router()

router.post("/", validateGroupInput, createNewRecord)

router.get("/", allGroupRecords)

export default router
