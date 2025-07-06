import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    trim: true
  },

  category: {
    type: String,
    enum: ['physical', 'mental', 'nutrition', 'social'],
    required: true
  },

  frequency: {
    type: String,
    enum: ['daily', 'weekly'],
    required: true
  },

  xpReward: {
    type: Number,
    default: 10
  },

  isActive: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Challenge = mongoose.model('Challenge', challengeSchema);
export default Challenge;
