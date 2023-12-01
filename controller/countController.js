import Count from "../models/CountModel.js"
import User from "../models/UserModel.js"
import { StatusCodes } from "http-status-codes"
import { UnAuthorizedError } from "../errors/customErrors.js"
import dayjs from "dayjs"

export const getEveryCount = async (req, res) => {
  const { enteredAt } = req.query

  const queryObject = {
    enteredAt: dayjs(new Date(Date.now())).format("YYYY-MM-DD"),
  }

  if (req.user.role !== "admin") {
    throw new UnAuthorizedError("not authorized to access this route")
  }

  if (enteredAt) {
    queryObject.enteredAt = enteredAt
  }
  const counts = await Count.find(queryObject)
  res.status(StatusCodes.OK).json({ count: counts.length, counts })
}

export const createCount = async (req, res) => {
  req.body.user = req.user.userId
  req.body.enteredAt = dayjs(new Date(Date.now())).format("YYYY-MM-DD")

  const user = await User.findOne({ _id: req.user.userId })
  req.body.royalChapter = user.royalChapter
  const newEditFlag = dayjs(new Date(Date.now()).toString()).format(
    "YYYY-MM-DD"
  )
  req.body.editFlag = newEditFlag
  console.log(req.body.editFlag)
  console.log(newEditFlag)

  await Count.create(req.body)

  const _15mins = 1000 * 60 * 15

  res.cookie("edit", `${req.body.editFlag}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + _15mins),
  })

  res.status(StatusCodes.CREATED).json({ msg: "record created" })
}

export const getAllCounts = async (req, res) => {
  const { meetingType, from, to } = req.query
  const { id } = req.params

  if (req.user.userId !== id && req.user.role !== "admin") {
    throw new UnAuthorizedError("not authorized to perform this operation")
  }
  const queryObject = {
    user: id,
  }

  if (meetingType && meetingType !== "ALL")
    queryObject.meetingType = meetingType

  if (from && to) {
    queryObject.enteredAt = { $gte: from, $lte: to }
  }

  const counts = await Count.find(queryObject).sort("-enteredAt")

  res.status(StatusCodes.OK).json({ counts })
}

export const getSingleCount = async (req, res) => {
  const count = await Count.findOne({ _id: req.params.id })
  res.status(StatusCodes.OK).json({ count })
}

export const updateCount = async (req, res) => {
  const count = await Count.findById(req.params.id)
  const owner = req.user.userId === count.user.toString()
  const admin = req.user.role === "admin"
  const { edit } = req.cookies

  const isValidCookie = count.editFlag === edit

  if (!edit && !admin)
    throw new UnAuthorizedError("cookie expired, contact admin")

  if (!isValidCookie && !admin)
    throw new UnAuthorizedError("cookie expired, contact admin")

  if (!owner && !admin && !isValidCookie) {
    throw new UnAuthorizedError("unauthorized to access this route")
  }

  await Count.findByIdAndUpdate(count._id, req.body)
  res.status(StatusCodes.OK).json({ msg: "count updated" })
}

export const deleteCount = async (req, res) => {
  const count = await Count.findById(req.params.id)
  const admin = req.user.role === "admin"

  if (!admin) {
    throw new UnAuthorizedError("unauthorized to access this route")
  }

  await Count.findByIdAndDelete(count._id)
  res.status(StatusCodes.OK).json({ msg: "record deleted" })
}
