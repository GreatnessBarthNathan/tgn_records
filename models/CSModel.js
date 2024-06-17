import mongoose from "mongoose"

const CS_Schema = new mongoose.Schema(
  {
    phoneNumber: String,
    name: String,
    royalChapter: String,
    TEN: String,
    suggestion: String,
  },
  { timestamps: true }
)

export default mongoose.model("CS", CS_Schema)
