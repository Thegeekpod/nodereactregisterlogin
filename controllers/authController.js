import bcrypt from 'bcrypt';
import { sign } from '../utils/jwt.js';

import User from '../models/User.js';

// Register user
// Register user
export const register = async (req, res) => {
  try {
    const { username, email,password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(409).json({ error: 'email already exists' });
      return;
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email,password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
};


// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = sign({ id: user.id }); // Use the correct function name 'sign'
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};
