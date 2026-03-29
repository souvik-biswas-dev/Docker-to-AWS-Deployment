import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'medium',
    dueDate: '',
    completed: false
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        completed: task.completed || false
      });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    const submitData = {
      ...formData,
      title: formData.title.trim(),
      dueDate: formData.dueDate || undefined
    };

    onSubmit(task?._id, submitData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass"
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '40px',
        borderRadius: 'var(--border-radius)',
        border: '1px solid var(--border-color)'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          background: 'var(--gradient)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}>
          {task ? '✏️' : '✨'}
        </div>
        <div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            margin: 0,
            color: 'var(--text-primary)'
          }}>
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <p style={{
            color: 'var(--text-muted)',
            margin: '4px 0 0 0',
            fontSize: '14px'
          }}>
            {task ? 'Update your task details' : 'Add a new task to your workflow'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-input"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter your task title..."
            required
            autoFocus
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="priority">
              Priority Level
            </label>
            <select
              id="priority"
              name="priority"
              className="form-input"
              value={formData.priority}
              onChange={handleChange}
              style={{ cursor: 'pointer' }}
            >
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="dueDate">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="form-input"
              value={formData.dueDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {task && (
          <div className="form-group">
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              color: 'var(--text-secondary)'
            }}>
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
                style={{
                  width: '18px',
                  height: '18px',
                  cursor: 'pointer'
                }}
              />
              Mark as completed
            </label>
          </div>
        )}

        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '40px',
          justifyContent: 'flex-end'
        }}>
          <motion.button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ padding: '12px 24px' }}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            className="btn btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>{task ? '💾' : '✨'}</span>
            {task ? 'Update Task' : 'Create Task'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;