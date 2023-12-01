import { UnauthenticatedError } from "../errors/customErrors.js"
import { verifyJwt } from "../utils/tokenUtils.js"

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies

  if (!token) throw new UnauthenticatedError("invalid credentials")

  try {
    req.user = verifyJwt(token)
    next()
  } catch (error) {
    throw new UnauthenticatedError("invalid credentials")
  }
}
