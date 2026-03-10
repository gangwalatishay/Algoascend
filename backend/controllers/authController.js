const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function hashPassword(req, res) {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: 'Password required' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    res.json({ hashedPassword });
  } catch (error) {
    res.status(500).json({ error: 'Error hashing password' });
  }
}

async function comparePassword(req, res) {
  try {
    const { password, hashedPassword } = req.body;
    if (!password || !hashedPassword) {
      return res.status(400).json({ error: 'Data missing' });
    }
    const isMatch = await bcrypt.compare(password, hashedPassword);
    res.json({ isMatch });
  } catch (error) {
    res.status(500).json({ error: 'Error comparing password' });
  }
}

function generateToken(req, res) {
  try {
    const user = req.body;
    if (!user) {
      return res.status(400).json({ error: 'User data required' });
    }
    const token = jwt.sign(user, process.env.JWT_SECRET || 'secret', {
      expiresIn: '24h',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error generating token' });
  }
}

module.exports = { hashPassword, comparePassword, generateToken };

