import express from 'express';
import UserProfile from '../models/userProfile.js';
const router = express.Router();

router.post('/profile', async (req, res) => {
  try {
    const { weight, height, age, gender, allergies, healthConditions } = req.body;

    const profile = await UserProfile.findOneAndUpdate(
      { user: req.user.id },
      { weight, height, age, gender, allergies, healthConditions },
      { upsert: true, new: true }
    );

    res.json({ message: 'Profile saved successfully', profile });
  } catch (error) {
    res.status(500).json({ message: 'Error saving profile', error });
  }
});