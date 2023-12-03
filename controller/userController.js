import { StatusCodes } from "http-status-codes"
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
  UnauthenticatedError,
} from "../errors/customErrors.js"
import User from "../models/UserModel.js"
import mongoose from "mongoose"
import { hashPassword, comparePassword } from "../utils/passwordUtils.js"

export const getAllUsers = async (req, res) => {
  const { role } = req.user
  const isAdmin = role === "admin"

  if (!isAdmin) throw new UnAuthorizedError("unauthorized to access this route")

  const users = await User.find({ role: "user" }).select("-password -email")
  res.status(StatusCodes.OK).json({ count: users.length, users })
}

export const getSingleUser = async (req, res) => {
  const isValidId = await mongoose.Types.ObjectId.isValid(req.params.id)
  if (!isValidId) throw new BadRequestError("not a valid mongoose id")

  const user = await User.findOne({ _id: req.params.id }).select(
    "-password -email"
  )
  if (!user) throw new NotFoundError(`no user with id: ${req.params.id}`)
  res.status(StatusCodes.OK).json({ user })
}

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select("-password")
  if (!user) throw new NotFoundError("user not found")
  res.status(StatusCodes.OK).json({ user })
}

export const updateUser = async (req, res) => {
  const isValidId = await mongoose.Types.ObjectId.isValid(req.params.id)
  if (!isValidId) throw new BadRequestError("not a valid mongoose id")

  const user = await User.findOne({ _id: req.params.id })
  if (!user) throw new NotFoundError(`no user with id: ${req.params.id}`)

  await User.findByIdAndUpdate(user._id, req.body)
  res.status(StatusCodes.OK).json({ msg: "user updated" })
}

export const deleteUser = async (req, res) => {
  const isValidId = await mongoose.Types.ObjectId.isValid(req.params.id)
  if (!isValidId) throw new BadRequestError("not a valid mongoose id")

  const user = await User.findOne({ _id: req.params.id })
  if (!user) throw new NotFoundError(`no user with id: ${req.params.id}`)

  const isAdmin = req.user.role === "admin"
  console.log(isAdmin)
  if (!isAdmin)
    throw new UnAuthorizedError("not permitted to carryout this operation")

  await User.findOneAndDelete({ _id: user._id })
  res.status(StatusCodes.OK).json({ msg: "user deleted successfully" })
}

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body
  if (!oldPassword || !newPassword)
    throw new BadRequestError("provide all values")

  const user = await User.findOne({ _id: req.user.userId })
  if (!user) throw new UnAuthorizedError("forbidden")

  const isValidPassword = await comparePassword(oldPassword, user.password)

  if (!isValidPassword) throw new UnauthenticatedError("invalid credentials")

  const changedPassword = await hashPassword(newPassword)
  user.password = changedPassword
  await user.save()
  res.status(StatusCodes.OK).json({ msg: "password changed" })
}
