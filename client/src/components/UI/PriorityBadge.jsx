import React from 'react';
import { ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';

const CONFIG = {
  high: { label: 'High', icon: ArrowUp, className: 'badge-high' },
  medium: { label: 'Medium', icon: ArrowRight, className: 'badge-medium' },
  low: { label: 'Low', icon: ArrowDown, className: 'badge-low' },
};

export default function PriorityBadge({ priority = 'medium' }) {
  const { label, icon: Icon, className } = CONFIG[priority] || CONFIG.medium;
  return (
    <span className={`priority-badge ${className}`}>
      <Icon size={12} />
      {label}
    </span>
  );
}
