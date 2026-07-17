import Count from '../models/CountModel.js'
import User from '../models/UserModel.js'
import RC from '../models/RCModel.js'
import { StatusCodes } from 'http-status-codes'
import { UnAuthorizedError, BadRequestError } from '../errors/customErrors.js'
import dayjs from 'dayjs'

export const getEveryCount = async (req, res) => {
  const { enteredAt } = req.query

  const queryObject = {
    enteredAt: dayjs(new Date(Date.now())).format('YYYY-MM-DD'),
  }

  if (req.user.role !== 'admin') {
    throw new UnAuthorizedError('not authorized to access this route')
  }

  if (enteredAt) {
    queryObject.enteredAt = enteredAt
  }
  const counts = await Count.find(queryObject).sort({ royalChapter: 1 })
  res.status(StatusCodes.OK).json({ count: counts.length, counts })
}

export const createCount = async (req, res) => {
  req.body.user = req.user.userId
  req.body.enteredAt = dayjs(new Date(Date.now())).format('YYYY-MM-DD')

  const user = await User.findOne({ _id: req.user.userId })
  const rc = await RC.findOne({ _id: user.rc })

  req.body.royalChapter = rc.name
  req.body.rc = rc._id

  const newEditFlag = dayjs(new Date(Date.now()).toString()).format(
    'YYYY-MM-DD',
  )
  req.body.editFlag = newEditFlag

  const CurrentRecord = await Count.findOne({
    enteredAt: req.body.enteredAt,
    royalChapter: user.royalChapter,
  })

  if (CurrentRecord)
    throw new BadRequestError(
      'Record present on this date. Edit existing record.',
    )

  await Count.create(req.body)

  res.status(StatusCodes.CREATED).json({ msg: 'record created' })
}

export const getAllCounts = async (req, res) => {
  let { meetingType, from, to, limit, page } = req.query
  const { id } = req.params

  const user = await User.findOne({ _id: id })
  if (!user) throw new BadRequestError('User not found')

  const rc = await RC.findOne({ _id: user.rc })

  if (!rc && req.user.role !== 'admin')
    throw new BadRequestError('RC not found or user is not admin')

  if (
    user._id.toString() !== rc.handler.toString() &&
    req.user.role !== 'admin'
  ) {
    throw new UnAuthorizedError('not authorized to access this route')
  }

  if (user.role !== 'rcHead' && req.user.role !== 'admin') {
    throw new UnAuthorizedError('not authorized to access this route')
  }

  const queryObject = {
    user: id,
    rc: rc._id,
  }

  if (meetingType && meetingType === 'VISION PLS S') {
    meetingType = 'VISION PLS+S'
    queryObject.meetingType = meetingType
  }

  if (meetingType && meetingType !== 'ALL') {
    queryObject.meetingType = meetingType
  }
  if (from && to) {
    queryObject.enteredAt = { $gte: from, $lte: to }
  }

  // pagination
  const pageLimit = Number(limit)
  const pageNumber = Number(page) || 1
  const skip = (pageNumber - 1) * pageLimit

  // Fetch total count(optional, for frontend pagination)
  const totalCounts = await Count.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalCounts / pageLimit)

  // Fetch paginated results

  const counts = await Count.find(queryObject)
    .sort('-enteredAt')
    .skip(skip)
    .limit(pageLimit)

  res.status(StatusCodes.OK).json({ counts, totalCounts, numOfPages })
}

export const getSingleCount = async (req, res) => {
  const count = await Count.findOne({ _id: req.params.id })
  res.status(StatusCodes.OK).json({ count })
}

export const updateCount = async (req, res) => {
  const count = await Count.findById(req.params.id)
  const owner = req.user.userId === count.user.toString()
  const admin = req.user.role === 'admin'

  const today = dayjs(new Date(Date.now())).format('YYYY-MM-DD')

  if (today !== count.enteredAt && !admin)
    throw new BadRequestError('Edit time elapsed')
  // const { edit } = req.cookies

  // const isValidCookie = count.editFlag === edit

  // if (!edit && !admin)
  //   throw new UnAuthorizedError("cookie expired, contact admin")

  // if (!isValidCookie && !admin)
  //   throw new UnAuthorizedError("cookie expired, contact admin")

  // if (!owner && !admin && !isValidCookie) {
  //   throw new UnAuthorizedError("unauthorized to access this route")
  // }

  await Count.findByIdAndUpdate(count._id, req.body)
  res.status(StatusCodes.OK).json({ msg: 'count updated' })
}

export const deleteCount = async (req, res) => {
  const count = await Count.findById(req.params.id)
  const admin = req.user.role === 'admin'

  if (!admin) {
    throw new UnAuthorizedError('unauthorized to access this route')
  }

  await Count.findByIdAndDelete(count._id)
  res.status(StatusCodes.OK).json({ msg: 'record deleted' })
}
