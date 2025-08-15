// models/Report.js
import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  weekStart: {
    type: Date,
    required: true
  },

  xpGained: {
    type: Number,
    default: 0
  },

  challengesCompleted: {
    type: Number,
    default: 0
  },

  badgesUnlocked: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge'
  }],

  moodSummary: [{
    date: Date,
    emoji: String
  }]
});

const Report = mongoose.model('Report', reportSchema);
export default Report;
