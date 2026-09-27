import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = (user?.name || '?')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const joined = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : null;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Profile</h1>
          <p>Your account details.</p>
        </div>
      </div>

      <div className="card profile-card">
        <div className="avatar profile-avatar">{initials}</div>
        <div className="profile-info">
          <h2>{user?.name}</h2>
          <div className="profile-detail">
            <Mail size={15} />
            {user?.email}
          </div>
          {joined && (
            <div className="profile-detail">
              <Calendar size={15} />
              Joined {joined}
            </div>
          )}
        </div>
      </div>

      <button
        className="btn btn-danger-ghost profile-logout"
        onClick={() => {
          logout();
          navigate('/login');
        }}
      >
        <LogOut size={16} /> Log out
      </button>
    </div>
  );
}
