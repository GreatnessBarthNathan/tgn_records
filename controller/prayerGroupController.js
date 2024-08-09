import dayjs from "dayjs"
import GroupRecord from "../models/PrayerGroupModel.js"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, NotFoundError } from "../errors/customErrors.js"

export const createNewRecord = async (req, res) => {
  const enteredAt = dayjs(new Date(Date.now())).format("YYYY-MM-DD")
  const groupRecord = await GroupRecord.findOne({
    group: req.body.group,
    enteredAt,
  })
  if (groupRecord)
    throw new BadRequestError("record already exist for this date")
  await GroupRecord.create({ ...req.body, enteredAt })
  res.status(StatusCodes.CREATED).json({ msg: "record created" })
}

export const allGroupRecords = async (req, res) => {
  const groupRecords = await GroupRecord.find({}).sort({ group: 1 })
  res.status(StatusCodes.OK).json({ groupRecords })
}

export const singleGroupRecord = async (req, res) => {
  const groupRecord = await GroupRecord.findOne({ _id: req.params.id })
  if (!groupRecord)
    throw new NotFoundError(`No record found for id: ${req.params.id}`)
  res.status(StatusCodes.OK).json({ groupRecord })
}

export const updateGroupRecord = async (req, res) => {
  const groupRecord = await GroupRecord.findOne({ _id: req.params.id })
  if (!groupRecord)
    throw new NotFoundError(`No record found for id: ${req.params.id}`)
  await GroupRecord.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { runValidators: true, new: true }
  )
  res.status(StatusCodes.OK).json({ msg: "record updated" })
}

export const deleteRecord = async (req, res) => {}
