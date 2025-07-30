// components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="spinner"></div>
        <p className="loading-text">Loading your goals...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
