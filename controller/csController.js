import { StatusCodes } from "http-status-codes"
import { NotFoundError } from "../errors/customErrors.js"
import User from "../models/UserModel.js"
import CS from "../models/CSModel.js"

export const createCS = async (req, res) => {
  const user = await User.findById(req.user.userId)
  if (!user) throw new NotFoundError("User not found")
  req.body.royalChapter = user.royalChapter
  await CS.create(req.body)
  res.status(StatusCodes.CREATED).json({ msg: "suggestion created" })
}

export const getAllCS = async (req, res) => {
  const user = await User.findById(req.user.userId)
  if (!user) throw new NotFoundError("User not found")
  const allCS = await CS.find({ royalChapter: user.royalChapter })
  res.status(StatusCodes.OK).json({ count: allCS.length, allCS })
}

export const getSingleCS = async (req, res) => {
  const user = await User.findById(req.user.userId)
  if (!user) throw new NotFoundError("User not found")
  const cs = await CS.findOne({
    _id: req.params.id,
    royalChapter: user.royalChapter,
  })

  if (!cs) throw new NotFoundError("cs not found")

  res.status(StatusCodes.OK).json({ cs })
}

export const updateCS = async (req, res) => {
  const user = await User.findById(req.user.userId)
  if (!user) throw new NotFoundError("User not found")
  const cs = await CS.findOne({
    _id: req.params.id,
    royalChapter: user.royalChapter,
  })
  if (!cs) throw new NotFoundError("suggestion not found")
  await CS.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { runValidators: true, new: true }
  )
  res.status(StatusCodes.OK).json({ msg: "suggestion updated" })
}

export const deleteCS = async (req, res) => {
  const user = await User.findById(req.user.userId)
  if (!user) throw new NotFoundError("User not found")
  const cs = await CS.findOne({
    _id: req.params.id,
    royalChapter: user.royalChapter,
  })
  if (!cs) throw new NotFoundError("suggestion not found")
  await CS.findByIdAndDelete(req.params.id)
  res.status(StatusCodes.OK).json({ msg: "suggestion delete" })
}
