import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  royalChapter: String,
  location: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['admin', 'rcHead', 'user'],
    default: 'user',
  },
  rc: {
    type: mongoose.Types.ObjectId,
    ref: 'RC',
  },
});

export default mongoose.model('User', UserSchema);
