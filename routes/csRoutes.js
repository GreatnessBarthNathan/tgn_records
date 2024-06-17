import { Router } from "express"
import {
  createCS,
  getAllCS,
  getSingleCS,
  updateCS,
  deleteCS,
} from "../controller/csController.js"

import { validateCSInput } from "../middleware/validationMiddleware.js"

const router = Router()

router.post("/", validateCSInput, createCS)

router.get("/", getAllCS)

router.get("/:id", getSingleCS)

router.patch("/:id", validateCSInput, updateCS)

router.delete("/:id", deleteCS)

export default router
