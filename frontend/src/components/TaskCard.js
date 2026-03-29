import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'var(--accent-secondary)';
      case 'medium': return '#ffa726';
      case 'low': return '#4caf50';
      default: return 'var(--accent-primary)';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="glass"
      style={{
        padding: '24px',
        borderRadius: 'var(--border-radius)',
        border: `2px solid ${task.completed ? 'rgba(76, 175, 80, 0.3)' : 'var(--border-color)'}`,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'var(--transition)',
      }}
    >
      {/* Priority indicator stripe */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${getPriorityColor(task.priority)}, ${getPriorityColor(task.priority)}80)`,
        }}
      />

      {/* Completion overlay */}
      {task.completed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '120px',
            opacity: 0.1,
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          ✅
        </motion.div>
      )}

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>
              {getPriorityIcon(task.priority)}
            </span>
            <span style={{
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: getPriorityColor(task.priority),
              background: `${getPriorityColor(task.priority)}20`,
              padding: '4px 8px',
              borderRadius: '12px'
            }}>
              {task.priority}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(task._id, !task.completed);
            }}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: `2px solid ${task.completed ? '#4caf50' : 'var(--border-color)'}`,
              background: task.completed ? '#4caf50' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '12px',
              color: 'white',
              transition: 'var(--transition)'
            }}
          >
            {task.completed && '✓'}
          </motion.button>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '12px',
          color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)',
          textDecoration: task.completed ? 'line-through' : 'none',
          lineHeight: '1.4'
        }}>
          {task.title}
        </h3>

        {/* Due date */}
        {task.dueDate && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            <span style={{ fontSize: '16px' }}>📅</span>
            <span style={{
              color: isOverdue ? '#ff4757' : 'var(--text-secondary)',
              fontWeight: isOverdue ? '600' : '400'
            }}>
              {format(new Date(task.dueDate), 'MMM dd, yyyy')}
              {isOverdue && ' (Overdue)'}
            </span>
          </div>
        )}

        {/* Timestamps */}
        <div style={{
          fontSize: '12px',
          color: 'var(--text-muted)',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '12px',
          marginTop: '16px'
        }}>
          <div>Created: {format(new Date(task.createdAt), 'MMM dd, HH:mm')}</div>
          {task.updatedAt !== task.createdAt && (
            <div>Updated: {format(new Date(task.updatedAt), 'MMM dd, HH:mm')}</div>
          )}
        </div>

        {/* Action buttons */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginTop: '16px',
          opacity: 0,
          transform: 'translateY(10px)',
          transition: 'all 0.3s ease',
          pointerEvents: 'none'
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.pointerEvents = 'auto';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0';
            e.currentTarget.style.transform = 'translateY(10px)';
            e.currentTarget.style.pointerEvents = 'none';
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="btn btn-secondary"
            style={{
              flex: 1,
              padding: '8px 12px',
              fontSize: '12px'
            }}
          >
            ✏️ Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('Are you sure you want to delete this task?')) {
                onDelete(task._id);
              }
            }}
            style={{
              flex: 1,
              padding: '8px 12px',
              fontSize: '12px',
              background: 'rgba(255, 71, 87, 0.1)',
              border: '1px solid rgba(255, 71, 87, 0.3)',
              color: '#ff4757',
              borderRadius: 'var(--border-radius)',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            🗑️ Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;