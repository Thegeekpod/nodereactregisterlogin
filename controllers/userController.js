import User from '../models/User.js';
import bcrypt from 'bcrypt';

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you already have the authenticated user ID
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user profile' });
  }
};

export const getUserProfileedit = async (req, res) => {
  try {
    const userId = await User.findByPk(req.user.id, { attributes: ['id'] });
    const id = userId.id;

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const { username, birthday } = req.body;

    user.username = username || user.username;
    user.birthday = birthday || user.birthday;

    await user.save();

    res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user profile' });
  }
};





export const getUserProfileedit2 = async (req, res) => {
  try {
    const userId = await User.findByPk(req.user.id, { attributes: ['id'] });
    const id = userId.id;

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const { username, birthday } = req.body;

    user.username = username || user.username;
    user.birthday = birthday || user.birthday;

    await user.save();

    res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user profile' });
  }
};
export const updateUserPassword = async (req, res) => {
  try {
    const userId = await User.findByPk(req.user.id, { attributes: ['id'] });
    const id = userId.id;

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const { currentPassword, newPassword } = req.body;

    // Check if the provided current password matches the user's actual password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid current password' });
      return;
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update password' });
  }
};



