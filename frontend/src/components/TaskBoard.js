import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TaskCard from './TaskCard';

const TaskBoard = ({ tasks, onEdit, onDelete, onUpdate }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    if (filter === 'high') return task.priority === 'high';
    if (filter === 'medium') return task.priority === 'medium';
    if (filter === 'low') return task.priority === 'low';
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'createdAt') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === 'dueDate') {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div>
      {/* Filter and Sort Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass"
        style={{
          padding: '20px',
          marginBottom: '30px',
          borderRadius: 'var(--border-radius)',
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Filter:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              fontSize: '14px'
            }}
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              fontSize: '14px'
            }}
          >
            <option value="createdAt">Created Date</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <div style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '14px' }}>
          {sortedTasks.length} task{sortedTasks.length !== 1 ? 's' : ''}
        </div>
      </motion.div>

      {/* Tasks Grid */}
      {sortedTasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass"
          style={{
            padding: '60px 40px',
            textAlign: 'center',
            borderRadius: 'var(--border-radius)',
            maxWidth: '500px',
            margin: '0 auto'
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.5 }}>
            📭
          </div>
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            No tasks found
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
            {filter === 'all'
              ? "Create your first task to get started!"
              : `No ${filter} tasks match your current filter.`
            }
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '20px'
          }}
        >
          {sortedTasks.map((task) => (
            <motion.div key={task._id} variants={itemVariants}>
              <TaskCard
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleComplete={(id, completed) =>
                  onUpdate(id, { completed })
                }
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TaskBoard;