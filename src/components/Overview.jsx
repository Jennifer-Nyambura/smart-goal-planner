import React from 'react';

const Overview = ({ goals }) => {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter(goal => 
    (goal.savedAmount / goal.targetAmount) * 100 >= 100
  ).length;
  const inProgressGoals = totalGoals - completedGoals;

  const stats = [
    {
      label: 'Total Goals',
      value: totalGoals,
      icon: (
        <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth={2} />
          <path d="M12 6v6l4 2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: 'blue'
    },
    {
      label: 'Total Saved',
      value: `$${totalSaved.toLocaleString()}`,
      icon: (
        <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: 'green'
    },
    {
      label: 'Completed',
      value: completedGoals,
      icon: (
        <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="22,4 12,14.01 9,11.01" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: 'emerald'
    },
    {
      label: 'In Progress',
      value: inProgressGoals,
      icon: (
        <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
          <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: 'orange'
    }
  ];

  return (
    <div className="overview">
      {stats.map((stat, index) => (
        <div key={index} className={`stat-card stat-${stat.color}`}>
          <div className="stat-content">
            <div className="stat-text">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
            <div className="stat-icon-container">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Overview;