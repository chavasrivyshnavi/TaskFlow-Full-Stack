import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Search, Plus } from 'lucide-react';
import { useTasks } from '../context/TaskContext.jsx';
import TaskCard from '../components/Tasks/TaskCard.jsx';
import TaskModal from '../components/Tasks/TaskModal.jsx';
import EmptyState from '../components/UI/EmptyState.jsx';
import Spinner from '../components/UI/Spinner.jsx';

const VIEW_CONFIG = {
  all: { title: 'My Tasks', subtitle: 'Everything on your plate, in one place.' },
  today: { title: 'Today', subtitle: 'Tasks due today.' },
  upcoming: { title: 'Upcoming', subtitle: 'Tasks coming up, sorted by due date.' },
  completed: { title: 'Completed', subtitle: 'Tasks you have already finished.' },
};

// dueDate is a plain "YYYY-MM-DD" string (from an <input type="date">), so
// comparing it as a Date object can shift by a day depending on the
// browser's timezone. Comparing the strings directly avoids that.
function todayStr() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function TasksPage({ view }) {
  const {
    tasks,
    categories,
    tasksLoading,
    fetchTasks,
    fetchCategories,
    createTask,
    updateTask,
    toggleTaskStatus,
    deleteTask,
  } = useTasks();

  const [search, setSearch] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const load = useCallback(() => {
    const params = { sort: sortOption };
    if (search) params.search = search;
    if (view === 'all') params.filter = filterOption;
    else if (view === 'completed') params.filter = 'completed';
    fetchTasks(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterOption, sortOption, view]);

  useEffect(() => {
    load();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  const visibleTasks = useMemo(() => {
    if (view === 'today') {
      return tasks.filter((t) => t.dueDate === todayStr());
    }
    if (view === 'upcoming') {
      const today = todayStr();
      return tasks
        .filter((t) => t.dueDate && t.dueDate > today && t.status !== 'completed')
        .sort((a, b) => (a.dueDate < b.dueDate ? -1 : 1));
    }
    return tasks;
  }, [tasks, view]);

  const categoryById = (id) => categories.find((c) => c.id === id);
  const { title, subtitle } = VIEW_CONFIG[view];

  const openCreate = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleSubmit = async (data) => {
    if (editingTask) {
      await updateTask(editingTask.id, data);
    } else {
      await createTask(data);
      load();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task? This cannot be undone.')) {
      await deleteTask(id);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Plus size={16} /> Create Task
        </button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {view === 'all' && (
          <select className="select-pill" value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        )}

        <select className="select-pill" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="dueDate">Due date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      {tasksLoading ? (
        <div className="page-loading">
          <Spinner size={28} />
        </div>
      ) : visibleTasks.length === 0 ? (
        <EmptyState
          title="No tasks yet"
          message="Create your first task and start organizing your day."
          actionLabel="Create Task"
          onAction={openCreate}
        />
      ) : (
        <div className="task-list">
          {visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              category={categoryById(task.category)}
              onToggle={toggleTaskStatus}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        categories={categories}
        initialTask={editingTask}
      />
    </div>
  );
}
