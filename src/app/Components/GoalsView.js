// src/components/GoalsView.js
import React from 'react';
import { Plus, Edit2, Trash2, CheckCircle, Calendar } from 'lucide-react';

const GoalsView = ({ goals, setShowAddModal, deleteGoal, openDepositModal, openEditModal }) => {
  const formatKSH = (amount) => {
    return `KSH ${amount.toLocaleString()}`;
  };

  const getTimeLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Overdue', color: 'text-red-400' };
    if (diffDays <= 30) return { text: `${diffDays} days left`, color: 'text-yellow-400' };
    return { text: `${diffDays} days left`, color: 'text-green-400' };
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">My Savings Goals</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-6 py-3 rounded-lg hover:from-amber-700 hover:to-yellow-700 transition-all shadow-lg"
        >
          <Plus className="w-5 h-5 inline mr-2" />
          Add New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map(goal => {
          const progress = (goal.savedAmount / goal.targetAmount) * 100;
          const timeLeft = getTimeLeft(goal.deadline);
          const isCompleted = goal.savedAmount >= goal.targetAmount;
          
          return (
            <div key={goal.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{goal.name}</h3>
                  <p className="text-sm text-gray-600">{goal.category}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(goal)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{formatKSH(goal.savedAmount)}</span>
                  <span>{formatKSH(goal.targetAmount)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      isCompleted ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-amber-500 to-yellow-500'
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{progress.toFixed(1)}% Complete</p>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-600">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  {new Date(goal.deadline).toLocaleDateString()}
                </div>
                <span className={`text-sm ${timeLeft.color}`}>{timeLeft.text}</span>
              </div>

              {!isCompleted && (
                <button
                  onClick={() => openDepositModal(goal)}
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white py-2 rounded-lg hover:from-amber-700 hover:to-yellow-700 transition-all"
                >
                  Make Deposit
                </button>
              )}

              {isCompleted && (
                <div className="flex items-center justify-center py-2 text-green-600 font-semibold">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Goal Completed!
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalsView;