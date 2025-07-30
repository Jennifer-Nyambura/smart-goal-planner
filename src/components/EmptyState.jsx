// components/EmptyState.js
import React from 'react';

const EmptyState = ({ onAddGoal }) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth={2} />
          <path d="M12 6v6l4 2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="empty-title">No goals yet</h3>
      <p className="empty-description">Start by creating your first financial goal</p>
      <button onClick={onAddGoal} className="btn btn-primary">
        Add Your First Goal
      </button>
    </div>
  );
};

export default EmptyState;
