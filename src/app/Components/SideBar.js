// src/components/Sidebar.js
import React from 'react';
import { Target, DollarSign, Plus } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, setShowAddModal, stats }) => {
  const formatKSH = (amount) => {
    return `KSH ${amount.toLocaleString()}`;
  };

  return (
    <div className="w-64 bg-gradient-to-b from-amber-900 via-amber-800 to-yellow-900 text-cream-100 p-6 shadow-2xl">
      <div className="flex items-center mb-8">
        <Target className="w-8 h-8 text-amber-200 mr-3" />
        <h1 className="text-xl font-bold text-amber-100">Goal Planner</h1>
      </div>
      
      <nav className="space-y-4">
        <button
          onClick={() => setActiveTab('overview')}
          className={`w-full text-left p-3 rounded-lg transition-all ${
            activeTab === 'overview' 
              ? 'bg-amber-700 text-amber-100 shadow-lg' 
              : 'text-amber-200 hover:bg-amber-800 hover:text-amber-100'
          }`}
        >
          <DollarSign className="inline w-5 h-5 mr-3" />
          Overview
        </button>
        
        <button
          onClick={() => setActiveTab('goals')}
          className={`w-full text-left p-3 rounded-lg transition-all ${
            activeTab === 'goals' 
              ? 'bg-amber-700 text-amber-100 shadow-lg' 
              : 'text-amber-200 hover:bg-amber-800 hover:text-amber-100'
          }`}
        >
          <Target className="inline w-5 h-5 mr-3" />
          My Goals
        </button>
        
        <button
          onClick={() => {
            setShowAddModal(true); 
            setActiveTab('goals');
          }}
          className="w-full text-left p-3 rounded-lg text-amber-200 hover:bg-amber-800 hover:text-amber-100 transition-all"
        >
          <Plus className="inline w-5 h-5 mr-3" />
          Add Goal
        </button>
      </nav>

      <div className="mt-8 p-4 bg-amber-800 rounded-lg">
        <h3 className="text-sm font-semibold text-amber-200 mb-2">Quick Stats</h3>
        <div className="text-xs text-amber-100 space-y-1">
          <div>Total Goals: {stats.totalGoals}</div>
          <div>Completed: {stats.completedGoals}</div>
          <div>Total Saved: {formatKSH(stats.totalSaved)}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;