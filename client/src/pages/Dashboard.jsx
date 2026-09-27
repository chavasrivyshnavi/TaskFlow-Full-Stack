import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useTasks } from '../context/TaskContext.jsx';
import StatsCards from '../components/Dashboard/StatsCards.jsx';
import ProgressChart from '../components/Dashboard/ProgressChart.jsx';
import TaskModal from '../components/Tasks/TaskModal.jsx';
import Spinner from '../components/UI/Spinner.jsx';
import EmptyState from '../components/UI/EmptyState.jsx';

function greetingForNow() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function Dashboard() {
  const { user } = useAuth();
  const { stats, fetchStats, categories, fetchCategories, createTask } = useTasks();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([fetchStats(), fetchCategories()]).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryById = (id) => categories.find((c) => c.id === id);

  if (loading || !stats) {
    return (
      <div className="page-loading">
        <Spinner size={28} />
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="greeting">
            {greetingForNow()}, {user?.name?.split(' ')[0]}
          </h1>
          <p className="greeting-sub">Here&apos;s what your day looks like.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Create Task
        </button>
      </div>

      <StatsCards stats={stats} />

      <div className="dashboard-grid">
        <ProgressChart data={stats.chart} />

        <div className="card today-card">
          <h3>Today&apos;s tasks</h3>
          {stats.todaysTasks.length === 0 ? (
            <EmptyState
              title="Nothing due today"
              message="Enjoy the breathing room, or add something to get ahead."
              actionLabel="Create Task"
              onAction={() => setModalOpen(true)}
            />
          ) : (
            <div className="today-list">
              {stats.todaysTasks.map((t) => {
                const cat = categoryById(t.category);
                return (
                  <div className="today-item" key={t.id}>
                    <span
                      className="today-item-dot"
                      style={{ background: cat ? cat.color : 'var(--primary)' }}
                    />
                    <span className="today-item-title">{t.title}</span>
                  </div>
                );
              })}
            </div>
          )}
          <button
            className="btn btn-secondary btn-block"
            style={{ marginTop: 14 }}
            onClick={() => navigate('/tasks')}
          >
            View all tasks
          </button>
        </div>
      </div>

      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={async (data) => {
          await createTask(data);
          await fetchStats();
        }}
        categories={categories}
      />
    </div>
  );
}
