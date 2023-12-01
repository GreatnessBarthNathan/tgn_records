import { StatusCodes } from "http-status-codes"

const errorHandler = async (err, req, res, next) => {
  const msg = err.message || "Something went wrong, try again later"
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR

  res.status(statusCode).json({ msg })
}

export default errorHandler
