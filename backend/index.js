import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import moodRoutes from './routes/mood.js';
import challengeRoutes from './routes/challenges.js';
import userRoutes from './routes/user.js';
import leaderboardRoutes from './routes/leaderboard.js';
import communityRoutes from './routes/community.js';
import postRoutes from './routes/post.js';
import notificationRoutes from './routes/notification.js';
import nutritionRoutes from './routes/nutritionRoutes.js';

dotenv.config();
connectDB(); 
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/nutrition', nutritionRoutes);



app.use(bodyParser.json());

// API route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ message: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
