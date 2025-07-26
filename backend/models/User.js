import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  passwordHash: {
    type: String,
    required: true
  },

  xp: {
    type: Number,
    default: 0
  },

  level: {
    type: Number,
    default: 1
  },
  badges: {
  type: [String],
  default: []
}
,

streak: {
  count: { type: Number, default: 0 },
  lastDate: { type: Date, default: null }
}
,

  assignedChallenges: {
  daily: [{
    challengeId: String,
    date: Date,
    completed: { 
        type: Boolean,
        default: false
      }
  }],
  weekly: [{
    challengeId: String,
    weekStart: Date,
    completed: { 
        type: Boolean,
        default: false
      }
  }]
},

   completedChallenges: [
  {
    challengeId: { type: String, required: true },
    date: { type: Date, required: true }
  }
],


  moodLogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mood'
  }],


  journalEntries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JournalEntry'
  }],

  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report'
  }],

  avatarId: {
    type: String, 
    default: () => {
      const avatars = ['lion', 'panda', 'koala', 'robot', 'astronaut', 'fox'];
      return avatars[Math.floor(Math.random() * avatars.length)];
    }
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);
export default User;
