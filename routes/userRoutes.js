import { Router } from "express"
import {
  updateUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  changePassword,
} from "../controller/userController.js"
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js"

const router = Router()
router.get("/", getAllUsers)

router.get("/current-user", getCurrentUser)

router.patch("/change-password", changePassword)

router.patch("/:id", validateUpdateUserInput, updateUser)

router.delete("/:id", deleteUser)

router.get("/:id", getSingleUser)

export default router
