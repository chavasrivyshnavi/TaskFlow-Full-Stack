const db = require('../db');

const Category = {
  findAllByUser(userId) {
    return db.get('categories').filter({ userId }).value();
  },

  findById(id, userId) {
    return db.get('categories').find({ id, userId }).value();
  },

  create(category) {
    db.get('categories').push(category).write();
    return category;
  },

  update(id, userId, updates) {
    db.get('categories').find({ id, userId }).assign(updates).write();
    return Category.findById(id, userId);
  },

  remove(id, userId) {
    db.get('categories').remove({ id, userId }).write();
    // also detach the category from any tasks that used it
    db.get('tasks')
      .filter({ userId, category: id })
      .each((t) => { t.category = null; })
      .write();
  },
};

module.exports = Category;
