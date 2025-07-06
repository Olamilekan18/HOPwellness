// models/Badge.js
import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    trim: true
  },

  type: {
    type: String,
    enum: ['xp', 'streak', 'challenges'],
    required: true
  },

  conditionValue: {
    type: Number,
    required: true
  },

  icon: {
    type: String, // e.g., emoji or image name
    default: '🏅'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Badge = mongoose.model('Badge', badgeSchema);
export default Badge;
