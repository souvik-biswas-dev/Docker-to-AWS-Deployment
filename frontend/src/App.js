import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskBoard from './components/TaskBoard';
import TaskForm from './components/TaskForm';
import Header from './components/Header';
import api from './services/api';
import './styles/global.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await api.get('/todos');
      setTasks(response.data.data || []);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (_, taskData) => {
    try {
      const response = await api.post('/todos', taskData);
      setTasks(prev => [...prev, response.data.data]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const response = await api.put(`/todos/${id}`, taskData);
      setTasks(prev => prev.map(task =>
        task._id === id ? response.data.data : task
      ));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="app">
      <Header onAddTask={() => setShowForm(true)} />

      <main style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="loading"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '60vh',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '50px',
                height: '50px',
                border: '3px solid var(--accent-primary)',
                borderTop: '3px solid transparent',
                borderRadius: '50%'
              }}
            />
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>
              Loading your tasks...
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TaskForm
                  task={editingTask}
                  onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                  onCancel={handleCancelForm}
                />
              </motion.div>
            ) : (
              <motion.div
                key="board"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TaskBoard
                  tasks={tasks}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onUpdate={handleUpdateTask}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}

export default App;