const { v4: uuidv4 } = require('uuid');
const Category = require('../models/Category');

exports.getCategories = (req, res) => {
  res.json(Category.findAllByUser(req.userId));
};

exports.createCategory = (req, res) => {
  try {
    const { name, color } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const category = {
      id: uuidv4(),
      userId: req.userId,
      name: name.trim(),
      color: color || '#2563EB',
    };
    Category.create(category);
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not create category' });
  }
};

exports.updateCategory = (req, res) => {
  const existing = Category.findById(req.params.id, req.userId);
  if (!existing) return res.status(404).json({ message: 'Category not found' });

  const { name, color } = req.body;
  const updates = {};
  if (name !== undefined) updates.name = name.trim();
  if (color !== undefined) updates.color = color;

  const category = Category.update(req.params.id, req.userId, updates);
  res.json(category);
};

exports.deleteCategory = (req, res) => {
  const existing = Category.findById(req.params.id, req.userId);
  if (!existing) return res.status(404).json({ message: 'Category not found' });

  Category.remove(req.params.id, req.userId);
  res.json({ message: 'Category deleted' });
};
