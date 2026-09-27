const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const User = require('../models/User');
const Category = require('../models/Category');
const { JWT_SECRET } = require('../middleware/auth');

const generateToken = (userId) => jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });

const DEFAULT_CATEGORIES = [
  { name: 'Work', color: '#2563EB' },
  { name: 'Personal', color: '#16A34A' },
  { name: 'Urgent', color: '#DC2626' },
];

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in your name, email and password' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    if (User.findByEmail(email)) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: uuidv4(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };
    User.create(user);

    DEFAULT_CATEGORIES.forEach((c) => {
      Category.create({ id: uuidv4(), userId: user.id, name: c.name, color: c.color });
    });

    const token = generateToken(user.id);
    res.status(201).json({ token, user: User.toSafeObject(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide your email and password' });
    }

    const user = User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user.id);
    res.json({ token, user: User.toSafeObject(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};

exports.getMe = (req, res) => {
  const user = User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(User.toSafeObject(user));
};
