import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Spinner from '../UI/Spinner.jsx';

const EMPTY_FORM = {
  title: '',
  description: '',
  priority: 'medium',
  category: '',
  dueDate: '',
};

export default function TaskModal({ open, onClose, onSubmit, categories, initialTask }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (initialTask) {
      setForm({
        title: initialTask.title || '',
        description: initialTask.description || '',
        priority: initialTask.priority || 'medium',
        category: initialTask.category || '',
        dueDate: initialTask.dueDate ? initialTask.dueDate.slice(0, 10) : '',
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setError('');
  }, [open, initialTask]);

  if (!open) return null;

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Task title is required');
      return;
    }
    setSaving(true);
    try {
      await onSubmit({
        ...form,
        category: form.category || null,
        dueDate: form.dueDate || null,
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save the task');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{initialTask ? 'Edit Task' : 'Create Task'}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="field">
              <label htmlFor="title">Task title</label>
              <input
                id="title"
                type="text"
                placeholder="e.g. Finish the quarterly report"
                value={form.title}
                onChange={handleChange('title')}
                autoFocus
              />
              {error && <span className="field-error">{error}</span>}
            </div>

            <div className="field">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows={3}
                placeholder="Add any extra detail (optional)"
                value={form.description}
                onChange={handleChange('description')}
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="priority">Priority</label>
                <select id="priority" value={form.priority} onChange={handleChange('priority')}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="category">Category</label>
                <select id="category" value={form.category} onChange={handleChange('category')}>
                  <option value="">No category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="dueDate">Due date</label>
              <input id="dueDate" type="date" value={form.dueDate} onChange={handleChange('dueDate')} />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving && <Spinner size={14} color="#fff" />}
              {initialTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
