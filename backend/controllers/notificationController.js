import Notification from '../models/Notification.js';

export const getUserNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .limit(50)
    .populate('fromUser', 'name avatarId')
    .populate('post', 'content')
    .populate('community', 'name');

  res.json(notifications);
};
