import React from 'react';
import { Pencil, Trash2, Calendar } from 'lucide-react';
import PriorityBadge from '../UI/PriorityBadge.jsx';

export default function TaskCard({ task, category, onToggle, onEdit, onDelete }) {
  const isCompleted = task.status === 'completed';

  // task.dueDate is a plain "YYYY-MM-DD" string. Building the Date from its
  // parts (rather than `new Date(task.dueDate)`) keeps it in local time, so
  // the displayed day never shifts because of the browser's timezone.
  const dueLabel = task.dueDate
    ? (() => {
        const [y, m, d] = task.dueDate.split('-').map(Number);
        return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      })()
    : null;

  return (
    <div className={`task-card card ${isCompleted ? 'task-card-done' : ''}`}>
      <button
        className={`task-checkbox ${isCompleted ? 'task-checkbox-checked' : ''}`}
        onClick={() => onToggle(task.id)}
        aria-label={isCompleted ? 'Mark as pending' : 'Mark as complete'}
      >
        {isCompleted && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6.5L4.5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className="task-body">
        <div className="task-top-row">
          <p className={`task-title ${isCompleted ? 'task-title-done' : ''}`}>{task.title}</p>
          <PriorityBadge priority={task.priority} />
        </div>

        {task.description && <p className="task-description">{task.description}</p>}

        <div className="task-meta">
          {category && (
            <span className="task-category" style={{ '--cat-color': category.color }}>
              {category.name}
            </span>
          )}
          {dueLabel && (
            <span className={`task-due ${task.overdue ? 'task-due-overdue' : ''}`}>
              <Calendar size={13} />
              {dueLabel}
              {task.overdue && ' · Overdue'}
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button className="icon-btn" onClick={() => onEdit(task)} aria-label="Edit task">
          <Pencil size={16} />
        </button>
        <button className="icon-btn task-delete" onClick={() => onDelete(task.id)} aria-label="Delete task">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
