// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-passwordHash');
      next();
    } else {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};
// Middleware to check if user is an admin
// This middleware checks if the user has admin privileges before allowing access to certain routes.
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};