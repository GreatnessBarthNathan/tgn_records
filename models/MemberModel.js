import mongoose from "mongoose"

const MemberSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  middleName: String,
  phoneNumber: String,
  email: String,
  sex: {
    type: String,
    enum: ["MALE", "FEMALE"],
  },
  DOB: Date,
  address: String,
  role: String,
  category: String,
  TEN: String,
  image: String,
  royalChapter: String,
})

export default mongoose.model("Member", MemberSchema)
