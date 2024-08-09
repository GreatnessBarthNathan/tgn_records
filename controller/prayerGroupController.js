import dayjs from "dayjs"
import GroupRecord from "../models/PrayerGroupModel.js"
import { StatusCodes } from "http-status-codes"
import { BadRequestError } from "../errors/customErrors.js"

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

export const updateRecord = async (req, res) => {}

export const deleteRecord = async (req, res) => {}
