const Task = require('../models/Task');

// See the comment in taskController.js - dueDate is a plain "YYYY-MM-DD"
// string, so we compare it as a string rather than parsing Date objects.
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

exports.getStats = (req, res) => {
  try {
    const tasks = Task.findAllByUser(req.userId);

    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const pending = tasks.filter((t) => t.status !== 'completed').length;
    const overdue = tasks.filter((t) => isOverdue(t)).length;

    const todaysTasks = tasks.filter((t) => t.dueDate === todayStr());

    // build a 7-day completion trend for the chart
    const days = [];
    for (let i = 6; i >= 0; i -= 1) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayStr = d.toDateString();
      const completedThatDay = tasks.filter(
        (t) => t.completedAt && new Date(t.completedAt).toDateString() === dayStr
      ).length;
      const createdThatDay = tasks.filter(
        (t) => t.createdAt && new Date(t.createdAt).toDateString() === dayStr
      ).length;
      days.push({ day: label, completed: completedThatDay, created: createdThatDay });
    }

    res.json({
      total,
      completed,
      pending,
      overdue,
      todaysTasks: todaysTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)),
      chart: days,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not load dashboard stats' });
  }
};
