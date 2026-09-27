import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../api/axios.js';
import { useToast } from './ToastContext.jsx';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState(null);
  const [tasksLoading, setTasksLoading] = useState(true);
  const toast = useToast();

  const fetchTasks = useCallback(async (params = {}) => {
    setTasksLoading(true);
    try {
      const res = await api.get('/tasks', { params });
      setTasks(res.data);
      return res.data;
    } catch (err) {
      toast.error('Could not load your tasks');
      return [];
    } finally {
      setTasksLoading(false);
    }
  }, [toast]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
      return res.data;
    } catch (err) {
      toast.error('Could not load categories');
      return [];
    }
  }, [toast]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await api.get('/dashboard/stats');
      setStats(res.data);
      return res.data;
    } catch (err) {
      toast.error('Could not load dashboard stats');
      return null;
    }
  }, [toast]);

  const createTask = async (data) => {
    const res = await api.post('/tasks', data);
    setTasks((prev) => [res.data, ...prev]);
    toast.success('Task created');
    return res.data;
  };

  const updateTask = async (id, data) => {
    const res = await api.put(`/tasks/${id}`, data);
    setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    toast.success('Task updated');
    return res.data;
  };

  const toggleTaskStatus = async (id) => {
    const res = await api.patch(`/tasks/${id}/status`);
    setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    return res.data;
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.success('Task deleted');
  };

  const createCategory = async (data) => {
    const res = await api.post('/categories', data);
    setCategories((prev) => [...prev, res.data]);
    toast.success('Category created');
    return res.data;
  };

  const updateCategory = async (id, data) => {
    const res = await api.put(`/categories/${id}`, data);
    setCategories((prev) => prev.map((c) => (c.id === id ? res.data : c)));
    toast.success('Category updated');
    return res.data;
  };

  const deleteCategory = async (id) => {
    await api.delete(`/categories/${id}`);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success('Category deleted');
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        categories,
        stats,
        tasksLoading,
        fetchTasks,
        fetchCategories,
        fetchStats,
        createTask,
        updateTask,
        toggleTaskStatus,
        deleteTask,
        createCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
