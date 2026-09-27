import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Tag } from 'lucide-react';
import { useTasks } from '../context/TaskContext.jsx';
import EmptyState from '../components/UI/EmptyState.jsx';
import Spinner from '../components/UI/Spinner.jsx';

const COLOR_OPTIONS = ['#2563EB', '#16A34A', '#DC2626', '#F59E0B', '#7C3AED', '#0EA5E9', '#DB2777', '#64748B'];

export default function CategoriesPage() {
  const { categories, fetchCategories, createCategory, updateCategory, deleteCategory } = useTasks();
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLOR_OPTIONS[0]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategories().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreate = () => {
    setEditing(null);
    setName('');
    setColor(COLOR_OPTIONS[0]);
    setFormOpen(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setName(cat.name);
    setColor(cat.color);
    setFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      if (editing) {
        await updateCategory(editing.id, { name, color });
      } else {
        await createCategory({ name, color });
      }
      setFormOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this category? Tasks using it will become uncategorized.')) {
      await deleteCategory(id);
    }
  };

  if (loading) {
    return (
      <div className="page-loading">
        <Spinner size={28} />
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Categories</h1>
          <p>Group your tasks the way that makes sense to you.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Plus size={16} /> New Category
        </button>
      </div>

      {formOpen && (
        <form className="card category-form" onSubmit={handleSubmit}>
          <div className="field-row">
            <div className="field" style={{ marginBottom: 0 }}>
              <label htmlFor="cat-name">Category name</label>
              <input
                id="cat-name"
                type="text"
                placeholder="e.g. Marketing"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label>Color</label>
              <div className="color-swatches">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    type="button"
                    key={c}
                    className={`color-swatch ${color === c ? 'color-swatch-active' : ''}`}
                    style={{ background: c }}
                    onClick={() => setColor(c)}
                    aria-label={`Choose color ${c}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="category-form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setFormOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {editing ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </form>
      )}

      {categories.length === 0 ? (
        <EmptyState
          icon={Tag}
          title="No categories yet"
          message="Create categories to keep related tasks grouped together."
          actionLabel="New Category"
          onAction={openCreate}
        />
      ) : (
        <div className="category-grid">
          {categories.map((cat) => (
            <div className="card category-card" key={cat.id}>
              <span className="category-dot" style={{ background: cat.color }} />
              <span className="category-name">{cat.name}</span>
              <div className="category-actions">
                <button className="icon-btn" onClick={() => openEdit(cat)} aria-label="Edit category">
                  <Pencil size={15} />
                </button>
                <button className="icon-btn task-delete" onClick={() => handleDelete(cat.id)} aria-label="Delete category">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
