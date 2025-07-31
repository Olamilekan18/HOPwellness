import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  type: {
    type: String,
    enum: ['follow', 'like', 'comment', 'community_post', 'system'],
    required: true
  },

  message: {
    type: String,
    required: true
  },

  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },

  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community'
  },

  isRead: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
