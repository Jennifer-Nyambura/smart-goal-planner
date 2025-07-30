import React from 'react';

const Navbar = ({ onAddGoal }) => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h1 className="navbar-title">Smart Goal Planner</h1>
            <p className="navbar-subtitle">Track and achieve your financial goals</p>
          </div>
          <button onClick={onAddGoal} className="btn btn-primary navbar-btn">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 5v14M5 12h14" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Add Goal
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;