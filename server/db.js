// TaskFlow's "database".
//
// Instead of MongoDB (which needs an Atlas account, a connection string,
// and internet access), TaskFlow stores everything in a plain JSON file
// at server/data/db.json using lowdb. It behaves like a real database in
// the code (db.get('tasks').find(...).write() etc.) but there is nothing
// to install, sign up for, or configure. The file is created automatically
// the first time the server runs.

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const adapter = new FileSync(path.join(dataDir, 'db.json'));
const db = low(adapter);

db.defaults({ users: [], tasks: [], categories: [] }).write();

module.exports = db;
