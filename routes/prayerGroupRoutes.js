import { Router } from "express"
import {
  createNewRecord,
  allGroupRecords,
  singleGroupRecord,
  updateGroupRecord,
} from "../controller/prayerGroupController.js"
import { validateGroupInput } from "../middleware/validationMiddleware.js"

const router = Router()

router.post("/", validateGroupInput, createNewRecord)

router.get("/", allGroupRecords)

router.get("/:id", singleGroupRecord)

router.patch("/:id", updateGroupRecord)

export default router
