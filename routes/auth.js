const express = require('express');
const AuthService = require('../services/AuthService');

const router = express.Router();
const authService = new AuthService();

const JWT_SECRET = 'super-secret-key'; // A placer en .env dans un vrai projet

const clients = [
  {
    client_id: 'client123',
    client_secret: 'secret123',
    redirect_uri: 'http://localhost:4000/callback',
  },
];

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  const user = authService.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  if (!authService.verifyPassword(email, password)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  return res.status(200).json({ token });
});

router.post('/register', (req, res) => {
  const { email, password } = req.body || {};
  const user = authService.createUser(email, password);
  return res.status(200).json(user);
});

module.exports = router;