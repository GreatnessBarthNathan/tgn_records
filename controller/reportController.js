import Report from "../models/ReportModel.js"
import User from "../models/UserModel.js"
import { StatusCodes } from "http-status-codes"

// create report
export const createReport = async (req, res) => {
  req.body.user = req.user.userId
  const user = await User.findOne({ _id: req.user.userId })
  req.body.royalChapter = user.royalChapter

  await Report.create(req.body)
  res.status(StatusCodes.CREATED).json({ msg: "report created" })
}

// get all reports
export const getAllReports = async (req, res) => {
  res.send("get all reports")
}
export const getSingleReport = async (req, res) => {
  res.send("get single report")
}
export const updateReport = async (req, res) => {
  res.send("update report")
}
export const deleteReport = async (req, res) => {
  res.send("delete report")
}
