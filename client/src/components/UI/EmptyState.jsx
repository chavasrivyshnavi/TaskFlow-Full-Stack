import React from 'react';
import { ClipboardList } from 'lucide-react';

export default function EmptyState({
  title = 'No tasks yet',
  message = 'Create your first task and start organizing your day.',
  actionLabel,
  onAction,
  icon: Icon = ClipboardList,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon size={28} />
      </div>
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLabel && onAction && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
