import mongoose from "mongoose"

const TENSchema = new mongoose.Schema({
  name: String,
  royalChapter: String,
  leader: String,
  assistant: String,
  VIP: String,
})

export default mongoose.model("TEN", TENSchema)
