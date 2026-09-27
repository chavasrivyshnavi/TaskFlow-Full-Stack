const { v4: uuidv4 } = require('uuid');
const Task = require('../models/Task');

// TaskFlow stores dueDate as a plain "YYYY-MM-DD" string (that's what an
// <input type="date"> sends). Comparing those as Date objects can shift by
// a day depending on the server/browser timezone, so we compare the date
// strings directly instead - ISO-formatted dates sort correctly as strings.
function todayStr() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function isOverdue(task) {
  if (!task.dueDate || task.status === 'completed') return false;
  return task.dueDate < todayStr();
}

exports.getTasks = (req, res) => {
  try {
    let tasks = Task.findAllByUser(req.userId);

    const { search, filter, category, sort } = req.query;

    if (search) {
      const q = search.toLowerCase();
      tasks = tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description || '').toLowerCase().includes(q)
      );
    }

    if (category) {
      tasks = tasks.filter((t) => t.category === category);
    }

    if (filter === 'active') {
      tasks = tasks.filter((t) => t.status !== 'completed');
    } else if (filter === 'completed') {
      tasks = tasks.filter((t) => t.status === 'completed');
    } else if (filter === 'overdue') {
      tasks = tasks.filter((t) => isOverdue(t));
    }

    const priorityWeight = { high: 3, medium: 2, low: 1 };
    if (sort === 'oldest') {
      tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sort === 'dueDate') {
      tasks.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else if (sort === 'priority') {
      tasks.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
    } else {
      tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    tasks = tasks.map((t) => ({ ...t, overdue: isOverdue(t) }));

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not load tasks' });
  }
};

exports.getTask = (req, res) => {
  const task = Task.findById(req.params.id, req.userId);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

exports.createTask = (req, res) => {
  try {
    const { title, description, priority, category, dueDate } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const task = {
      id: uuidv4(),
      userId: req.userId,
      title: title.trim(),
      description: description || '',
      status: 'pending',
      priority: priority || 'medium',
      category: category || null,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null,
    };

    Task.create(task);
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not create task' });
  }
};

exports.updateTask = (req, res) => {
  try {
    const existing = Task.findById(req.params.id, req.userId);
    if (!existing) return res.status(404).json({ message: 'Task not found' });

    const { title, description, priority, category, dueDate, status } = req.body;

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({ message: 'Task title cannot be empty' });
    }

    const updates = { updatedAt: new Date().toISOString() };
    if (title !== undefined) updates.title = title.trim();
    if (description !== undefined) updates.description = description;
    if (priority !== undefined) updates.priority = priority;
    if (category !== undefined) updates.category = category;
    if (dueDate !== undefined) updates.dueDate = dueDate;
    if (status !== undefined) {
      updates.status = status;
      updates.completedAt = status === 'completed' ? new Date().toISOString() : null;
    }

    const task = Task.update(req.params.id, req.userId, updates);
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not update task' });
  }
};

exports.updateStatus = (req, res) => {
  const existing = Task.findById(req.params.id, req.userId);
  if (!existing) return res.status(404).json({ message: 'Task not found' });

  const status = existing.status === 'completed' ? 'pending' : 'completed';
  const task = Task.update(req.params.id, req.userId, {
    status,
    completedAt: status === 'completed' ? new Date().toISOString() : null,
    updatedAt: new Date().toISOString(),
  });
  res.json(task);
};

exports.deleteTask = (req, res) => {
  const existing = Task.findById(req.params.id, req.userId);
  if (!existing) return res.status(404).json({ message: 'Task not found' });

  Task.remove(req.params.id, req.userId);
  res.json({ message: 'Task deleted' });
};
