import { Router } from "express"
import {
  createMember,
  getAllMembers,
  getSingleMember,
  updateMember,
  deleteMember,
} from "../controller/memberController.js"

import { validateMemberInput } from "../middleware/validationMiddleware.js"

const router = Router()

router.post("/", validateMemberInput, createMember)

router.get("/", getAllMembers)

router.get("/:id", getSingleMember)

router.patch("/:id", validateMemberInput, updateMember)

router.delete("/:id", deleteMember)

export default router
