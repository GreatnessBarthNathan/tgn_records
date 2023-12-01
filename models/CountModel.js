import mongoose from "mongoose"

const CountSchema = new mongoose.Schema({
  meetingType: {
    type: String,
    enum: ["NCR", "PEM", "TEN", "CONSECRATION", "TGP"],
  },
  totalCount: Number,
  firstTimers: Number,
  workForce: Number,
  converts: Number,
  males: Number,
  females: Number,
  enteredAt: String,
  royalChapter: String,
  editFlag: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
})

export default mongoose.model("Count", CountSchema)
