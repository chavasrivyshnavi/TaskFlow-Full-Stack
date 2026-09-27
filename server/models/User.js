const db = require('../db');

const User = {
  findByEmail(email) {
    return db.get('users').find({ email: email.toLowerCase() }).value();
  },

  findById(id) {
    return db.get('users').find({ id }).value();
  },

  create(user) {
    db.get('users').push(user).write();
    return user;
  },

  toSafeObject(user) {
    return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
  },
};

module.exports = User;
