const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Hunter = require('../models/Hunter');

const router = express.Router();

// สมัครสมาชิก
router.post('/register', async (req, res) => {
  try {
    const { username, password, weapon } = req.body;

    const existing = await Hunter.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Username already exists' });

    const passwordHash = await bcrypt.hash(password, 10);

    const hunter = new Hunter({ username, passwordHash, weapon });
    await hunter.save();

    res.status(201).json({ message: 'Hunter registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ล็อกอิน
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const hunter = await Hunter.findOne({ username });
    if (!hunter) return res.status(400).json({ message: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, hunter.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ hunterId: hunter._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, hunter: { username: hunter.username, rank: hunter.rank, level: hunter.level } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
