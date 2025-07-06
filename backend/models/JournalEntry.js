import mongoose from 'mongoose';

const journalEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  prompt: {
    type: String,
    trim: true
  },

  content: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);
export default JournalEntry;
