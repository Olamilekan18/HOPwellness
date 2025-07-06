// controllers/authController.js
import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/hashPassword.js';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });

    const passwordHash = await hashPassword(password);
    const user = await User.create({ name, email, passwordHash });

    const token = generateToken(user._id);
    res.status(201).json({ user: { id: user._id, name: user.name }, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.status(200).json({ user: { id: user._id, name: user.name }, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
};