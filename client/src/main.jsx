import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { TaskProvider } from './context/TaskContext.jsx';
import './styles/index.css';
import './styles/toast.css';
import './styles/landing.css';
import './styles/auth.css';
import './styles/layout.css';
import './styles/dashboard.css';
import './styles/tasks.css';
import './styles/modal.css';
import './styles/categories.css';
import './styles/profile.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <TaskProvider>
            <App />
          </TaskProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
