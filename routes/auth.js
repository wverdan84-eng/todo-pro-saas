const express = require('express');
const router = express.Router();

// Rota de login
router.post('/login', (req, res) => {
  res.json({ success: true, message: 'Login endpoint' });
});

// Rota de registro
router.post('/register', (req, res) => {
  res.json({ success: true, message: 'Register endpoint' });
});

module.exports = router;
