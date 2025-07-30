import React from 'react';

const GoalCard = ({ goal, onEdit, onDelete, onDeposit }) => {
  const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
  const remaining = Math.max(goal.targetAmount - goal.savedAmount, 0);
  
  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getGoalStatus = () => {
    const daysLeft = getDaysUntilDeadline(goal.deadline);
    
    if (progress >= 100) return 'completed';
    if (daysLeft < 0) return 'overdue';
    if (daysLeft <= 30) return 'warning';
    return 'on-track';
  };

  const status = getGoalStatus();
  const daysLeft = getDaysUntilDeadline(goal.deadline);

  const StatusIcon = ({ status }) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="22,4 12,14.01 9,11.01" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'overdue':
      case 'warning':
        return (
          <svg className="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="9" x2="12" y2="13" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 17h.01" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="goal-card">
      <div className="goal-card-header">
        <div className="goal-info">
          <h3 className="goal-name">{goal.name}</h3>
          <span className="goal-category">{goal.category}</span>
        </div>
        <div className="goal-actions">
          <button onClick={() => onEdit(goal)} className="btn-icon" title="Edit">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button onClick={() => onDelete(goal.id)} className="btn-icon btn-danger" title="Delete">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="3,6 5,6 21,6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="goal-content">
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-label">Progress</span>
            <span className="progress-percent">{progress.toFixed(1)}%</span>
          </div>
          
          <div className="progress-bar">
            <div 
              className={`progress-fill progress-${status}`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <div className="amount-info">
            <span className="current-amount">
              ${goal.savedAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
            </span>
            {remaining > 0 && (
              <span className="remaining-amount">${remaining.toLocaleString()} left</span>
            )}
          </div>
        </div>

        <div className="goal-footer">
          <div className={`goal-status status-${status}`}>
            <StatusIcon status={status} />
            <span className="status-text">
              {status === 'completed' && 'Completed!'}
              {status === 'overdue' && 'Overdue'}
              {status === 'warning' && `${daysLeft} days left`}
              {status === 'on-track' && `${daysLeft} days left`}
            </span>
          </div>
          
          {status !== 'completed' && (
            <button
              onClick={() => onDeposit(goal)}
              className="btn btn-success btn-sm"
            >
              Deposit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalCard;