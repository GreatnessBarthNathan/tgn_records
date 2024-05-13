import User from "../models/UserModel.js"
import { StatusCodes } from "http-status-codes"
import { hashPassword, comparePassword } from "../utils/passwordUtils.js"
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../errors/customErrors.js"
import { createJwt } from "../utils/tokenUtils.js"

export const register = async (req, res) => {
  const isFirstUser = (await User.countDocuments({})) === 0
  req.body.role = isFirstUser ? "admin" : "user"
  req.body.password = await hashPassword(req.body.password)
  req.body.royalChapter.charAt(0).toUpperCase()

  const userExists = await User.findOne({ royalChapter: req.body.royalChapter })
  if (userExists)
    throw new BadRequestError("Royal Chapter has already been registered")
  await User.create(req.body)
  res.status(StatusCodes.CREATED).json({ msg: "user created" })
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) throw new NotFoundError("user does not exist. please sign up")

  const isPasswordCorrect = await comparePassword(password, user.password)
  if (!isPasswordCorrect) throw new BadRequestError("Invalid credentials")

  const token = createJwt({
    userId: user._id,
    role: user.role,
    rc: user.royalChapter,
  })

  const oneDay = 1000 * 60 * 60 * 24

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + oneDay),
  })
  res.status(StatusCodes.OK).json({ msg: "user logged in" })
}

export const logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expire: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ msg: "user logged out" })
}

export const forgotPassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body

  if (!email || !password || !confirmPassword)
    throw new BadRequestError("please provide all values")

  if (password !== confirmPassword)
    throw new BadRequestError("passwords do not match")

  const user = await User.findOne({ email })

  if (!user) throw new NotFoundError("user does not exist")

  const newPassword = await hashPassword(password)
  user.password = newPassword
  await user.save()

  res.status(StatusCodes.OK).json({ msg: "password changed successfully" })
}
