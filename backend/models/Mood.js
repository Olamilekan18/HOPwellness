// models/Mood.js
import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  emoji: {
    type: String,
    required: true
  },

  note: {
    type: String,
    trim: true
  },

    title:{
      type: String,
      required: true,
      trim: true
    },
    tags:{
      type: [String],
      default: []
    },
  date: {
    type: Date,
    default: Date.now
  }
});

const Mood = mongoose.model('Mood', moodSchema);
export default Mood;
