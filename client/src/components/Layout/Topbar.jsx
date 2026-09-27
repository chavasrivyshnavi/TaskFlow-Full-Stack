import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const initials = (user?.name || '?')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header className="topbar">
      <button className="icon-btn topbar-menu-btn" onClick={onMenuClick} aria-label="Open menu">
        <Menu size={22} />
      </button>

      <div className="topbar-spacer" />

      <div className="topbar-user" ref={ref}>
        <button className="user-chip" onClick={() => setMenuOpen((o) => !o)}>
          <span className="avatar">{initials}</span>
          <span className="user-chip-name">{user?.name}</span>
        </button>

        {menuOpen && (
          <div className="user-menu">
            <button
              className="user-menu-item"
              onClick={() => {
                setMenuOpen(false);
                navigate('/profile');
              }}
            >
              <User size={16} />
              Profile
            </button>
            <button
              className="user-menu-item user-menu-danger"
              onClick={() => {
                setMenuOpen(false);
                logout();
                navigate('/login');
              }}
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
