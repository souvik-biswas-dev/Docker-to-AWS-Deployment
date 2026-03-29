import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ onAddTask }) => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass"
      style={{
        padding: '20px 40px',
        marginBottom: '30px',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(20px)',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <motion.div
          className="animate-float"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}
        >
          <div style={{
            width: '50px',
            height: '50px',
            background: 'var(--gradient)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            boxShadow: 'var(--shadow)'
          }}>
            ⚡
          </div>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0
            }}>
              TaskFlow
            </h1>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '14px',
              margin: '4px 0 0 0'
            }}>
              Streamline your productivity
            </p>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddTask}
          className="btn btn-primary"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '16px',
            padding: '14px 28px'
          }}
        >
          <span style={{ fontSize: '20px' }}>✨</span>
          New Task
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;