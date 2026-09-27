import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import DashboardLayout from './components/Layout/DashboardLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TasksPage from './pages/TasksPage.jsx';
import CategoriesPage from './pages/CategoriesPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import Spinner from './components/UI/Spinner.jsx';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner size={32} />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const { user, loading } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!loading && user ? <Navigate to="/dashboard" replace /> : <Landing />} />
      <Route path="/login" element={!loading && user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/register" element={!loading && user ? <Navigate to="/dashboard" replace /> : <Register />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<TasksPage view="all" />} />
        <Route path="/today" element={<TasksPage view="today" />} />
        <Route path="/upcoming" element={<TasksPage view="upcoming" />} />
        <Route path="/completed" element={<TasksPage view="completed" />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
