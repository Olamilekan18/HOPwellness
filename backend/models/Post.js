import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
  content: { type: String, required: true },
  image: { type: String }, 
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
