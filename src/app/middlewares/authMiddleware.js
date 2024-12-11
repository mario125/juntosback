// src/app/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();


function authMiddleware(req, res, next) {
  const token = req.headers.  authorization;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.body.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
}


function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    
  };

  const options = {
    expiresIn: '10000h', 
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
}

module.exports = { authMiddleware, generateToken };
