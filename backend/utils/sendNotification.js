import Notification from '../models/Notification.js';

export const sendNotification = async ({ userId, type, message, fromUser = null, post = null, community = null }) => {
  try {
    const newNotification = new Notification({
      user: userId,
      type,
      message,
      fromUser,
      post,
      community
    });
    await newNotification.save();
  } catch (error) {
    console.error("Failed to send notification:", error);
  }
};
