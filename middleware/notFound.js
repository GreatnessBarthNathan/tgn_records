import { StatusCodes } from "http-status-codes"

const notFound = async (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send("Route not found")
}

export default notFound
