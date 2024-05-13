import mongoose from "mongoose"

const ReportSchema = new mongoose.Schema({
  title: String,
  message: String,
  royalChapter: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
})

export default mongoose.model("Report", ReportSchema)
