import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  weight: Number, 
  height: Number, 
  age: Number,
  gender: { type: String, enum: ['male', 'female', 'other'] },
  allergies: [String], 
  healthConditions: [String], 
});

export default mongoose.model('UserProfile', userProfileSchema);
