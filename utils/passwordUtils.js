import bcrypt from "bcryptjs"

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const newPassword = await bcrypt.hash(password, salt)
  return newPassword
}

export const comparePassword = async (candidatePassword, password) => {
  const isMatch = await bcrypt.compare(candidatePassword, password)
  return isMatch
}
