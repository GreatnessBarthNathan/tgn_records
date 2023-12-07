import mongoose from "mongoose"

const RcFinanceSchema = new mongoose.Schema({
  meetingType: {
    type: String,
    enum: ["NCR", "PEM", "TEN", "CONSECRATION", "TGP", "THANKSGIVING"],
  },
  totalOffering: Number,
  _20: Number,
  _30: Number,
  _50: Number,
  enteredAt: String,
  firstFruit: Number,
  tithes: Number,
  seeds: Number,
  specialSeeds: Number,
  SGD: Number,
  TGP: Number,
  thanksgiving: Number,
  other: Number,
  royalChapter: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
})

export default mongoose.model("RcFinance", RcFinanceSchema)
