import { validationResult, body, param } from "express-validator"
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../errors/customErrors.js"
import User from "../models/UserModel.js"
import Count from "../models/CountModel.js"
import mongoose from "mongoose"

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)
        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}

// register validation
export const validateRegisterInput = withValidationErrors([
  body("firstName").notEmpty().withMessage("first name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("royalChapter").notEmpty().withMessage("royal chapter is required"),
  body("location").notEmpty().withMessage("location is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("enter a valid email")
    .custom(async (email) => {
      const user = await User.findOne({ email })
      if (user) throw new BadRequestError("user already exists")
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
])

// login validation
export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("enter valid email"),
  body("password").notEmpty().withMessage("password is required"),
])

// update user validation
export const validateUpdateUserInput = withValidationErrors([
  body("firstName").notEmpty().withMessage("first name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("email").notEmpty().withMessage("email is required"),
  body("royalChapter").notEmpty().withMessage("royal chapter is required"),
  body("location").notEmpty().withMessage("location is required"),
])

// create count validation
export const validateCountInput = withValidationErrors([
  body("meetingType").notEmpty().withMessage("meeting type is required"),
  body("totalCount").notEmpty().withMessage("total count is required"),
  body("firstTimers").notEmpty().withMessage("first timers is required"),
  body("workForce").notEmpty().withMessage("work force is required"),
  body("converts").notEmpty().withMessage("converts is required"),
  body("males").notEmpty().withMessage("males is required"),
  body("females").notEmpty().withMessage("females is required"),
])

export const validateCountIdParam = withValidationErrors([
  param("id").custom(async (id, { req }) => {
    const isValidId = await mongoose.Types.ObjectId.isValid(id)
    if (!isValidId) throw new BadRequestError("invalid mongoose id")

    const count = await Count.findOne({ _id: id })
    if (!count) throw new NotFoundError("this record is not available")
  }),
])

// Reports Validation
export const validateReportInput = withValidationErrors([
  body("title").notEmpty().withMessage("title is required"),
  body("message").notEmpty().withMessage("message is required"),
])

// RC Finance Validation
export const validateRcFinanceInput = withValidationErrors([
  body("meetingType").notEmpty().withMessage("meeting type is required"),
  body("totalOffering").notEmpty().withMessage("total offeting is required"),
  body("firstFruit").notEmpty().withMessage("first fruit record is required"),
  body("tithes").notEmpty().withMessage("tithes is required"),
  body("seeds").notEmpty().withMessage("seeds record is required"),
  body("specialSeeds")
    .notEmpty()
    .withMessage("special seeds record is required"),
  body("SGD").notEmpty().withMessage("SGD is required"),
  body("TGP").notEmpty().withMessage("TGP is required"),
  body("thanksgiving").notEmpty().withMessage("thanksgiving is required"),
])
