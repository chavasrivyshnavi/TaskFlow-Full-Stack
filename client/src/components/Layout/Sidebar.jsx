import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutGrid,
  ListChecks,
  CalendarDays,
  CalendarClock,
  CheckCircle2,
  Tag,
  Settings,
  X,
  CheckSquare,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/tasks', label: 'My Tasks', icon: ListChecks },
  { to: '/today', label: 'Today', icon: CalendarDays },
  { to: '/upcoming', label: 'Upcoming', icon: CalendarClock },
  { to: '/completed', label: 'Completed', icon: CheckCircle2 },
  { to: '/categories', label: 'Categories', icon: Tag },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <span className="sidebar-brand-icon">
            <CheckSquare size={20} />
          </span>
          <span>TaskFlow</span>
          <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
              onClick={onClose}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <NavLink
            to="/profile"
            className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
            onClick={onClose}
          >
            <Settings size={18} />
            <span>Settings &amp; Profile</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
