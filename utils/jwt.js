import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = 'your-jwt-secret-key';

export const sign = (payload) => {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
};

export const verify = (token) => {
  return jwt.verify(token, JWT_SECRET_KEY);
};

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const payload = verify(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
