const db = require('../db');

const Task = {
  findAllByUser(userId) {
    return db.get('tasks').filter({ userId }).value();
  },

  findById(id, userId) {
    return db.get('tasks').find({ id, userId }).value();
  },

  create(task) {
    db.get('tasks').push(task).write();
    return task;
  },

  update(id, userId, updates) {
    db.get('tasks').find({ id, userId }).assign(updates).write();
    return Task.findById(id, userId);
  },

  remove(id, userId) {
    db.get('tasks').remove({ id, userId }).write();
  },
};

module.exports = Task;
