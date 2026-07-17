import mongoose from 'mongoose';

const RCSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  address: { type: String, trim: true },
  handler: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('RC', RCSchema);
