import mongoose from "mongoose"

const GroupRecordSchema = new mongoose.Schema({
  group: Number,
  leader: String,
  expectedCount: Number,
  actualCount: Number,
  startTime: {
    hour: String,
    min: String,
    time: String,
  },
  endTime: {
    hour: String,
    min: String,
    time: String,
  },
  enteredAt: String,
})

export default mongoose.model("GroupRecord", GroupRecordSchema)
