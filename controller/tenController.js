import { BadRequestError, NotFoundError } from "../errors/customErrors.js"
import TEN from "../models/TENModel.js"
import User from "../models/UserModel.js"
import { StatusCodes } from "http-status-codes"

// CREATE TEN
export const createTen = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  if (!user) throw new NotFoundError("user not found")

  req.body.royalChapter = user.royalChapter

  const alreadyExists = await TEN.findOne({ name: req.body.name })
  if (alreadyExists) throw new BadRequestError("This TEN already exists")
  await TEN.create(req.body)
  res.status(StatusCodes.CREATED).json({ msg: "TEN created" })
}

// GET ALL TEN
export const getAllTen = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  const allTens = await TEN.find({ royalChapter: user.royalChapter })
  res.status(StatusCodes.OK).json({ allTens })
}

// GET SINGLE TEN
export const getSingleTen = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  if (!user) throw new NotFoundError("This user does not exist")
  const ten = await TEN.find({
    royalChapter: user.royalChapter,
    _id: req.params.id,
  })

  if (!ten) throw new NotFoundError("ten not found")
  res.status(StatusCodes.OK).json({ ten })
}

// UPDATE TEN
export const updateTen = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  if (!user) throw new NotFoundError("This user does not exist")

  const ten = await TEN.findOne({
    _id: req.params.id,
    royalChapter: user.royalChapter,
  })
  if (!ten) throw new NotFoundError(`No TEN with id: ${req.params.id}`)

  await TEN.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { runValidators: true, new: true }
  )
  res.status(StatusCodes.OK).json({ msg: "TEN record updated" })
}

// DELETE TEN
export const deleteTen = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })

  if (!user) throw new NotFoundError("This user does not exist")

  const ten = await TEN.findOne({
    _id: req.params.id,
    royalChapter: user.royalChapter,
  })
  if (!ten) throw new NotFoundError(`No TEN with id: ${req.params.id}`)

  await TEN.findByIdAndDelete(req.params.id)
  res.status(StatusCodes.OK).json({ msg: "TEN deleted" })
}
