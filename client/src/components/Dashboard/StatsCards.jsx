import React from 'react';
import { ListTodo, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function StatsCards({ stats }) {
  const items = [
    { label: 'Total Tasks', value: stats.total, icon: ListTodo, tone: 'blue' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle2, tone: 'green' },
    { label: 'Pending', value: stats.pending, icon: Clock, tone: 'amber' },
    { label: 'Overdue', value: stats.overdue, icon: AlertTriangle, tone: 'red' },
  ];

  return (
    <div className="stats-grid">
      {items.map(({ label, value, icon: Icon, tone }) => (
        <div className="stat-card card" key={label}>
          <div className={`stat-icon stat-icon-${tone}`}>
            <Icon size={18} />
          </div>
          <div>
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
