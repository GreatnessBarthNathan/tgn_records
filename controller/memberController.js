import User from "../models/UserModel.js"
import Member from "../models/MemberModel.js"
import { BadRequestError, NotFoundError } from "../errors/customErrors.js"
import { StatusCodes } from "http-status-codes"

export const createMember = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  if (!user) throw new NotFoundError("this user does not exist")

  const alreadyExists = await Member.findOne({
    phoneNumber: req.body.phoneNumber,
  })
  if (alreadyExists) throw new BadRequestError("this member already exists")

  req.body.royalChapter = user.royalChapter
  await Member.create(req.body)

  res.status(StatusCodes.CREATED).json({ msg: "user created" })
}

export const getAllMembers = async (req, res) => {
  const members = await Member.find({}).sort({ firstName: 1 })

  res.status(StatusCodes.OK).json({ count: members.length, members })
}

export const getSingleMember = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  if (!user) throw new NotFoundError("This user does not exist")

  const member = await Member.find({
    royalChapter: user.royalChapter,
    _id: req.params.id,
  })

  if (!member) throw new NotFoundError("member does not exist")
  res.status(StatusCodes.OK).json({ member })
}

export const updateMember = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  if (!user) throw new NotFoundError("This user does not exist")

  const member = await Member.findOne({
    _id: req.params.id,
    royalChapter: user.royalChapter,
  })

  if (!member) throw new NotFoundError(`No member with id: ${req.params.id}`)

  await Member.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { runValidators: true, new: true }
  )
  res.status(StatusCodes.OK).json({ msg: "update details saved" })
}

export const deleteMember = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })

  if (!user) throw new NotFoundError("This user does not exist")

  const member = await Member.findOne({
    _id: req.params.id,
    royalChapter: user.royalChapter,
  })
  if (!member) throw new NotFoundError(`No member with id: ${req.params.id}`)

  await Member.findByIdAndDelete(req.params.id)
  res.status(StatusCodes.OK).json({ msg: "member deleted" })
}
