// src/components/AddGoalModal.js
import React, { useState } from 'react';

const AddGoalModal = ({ onClose, onAddGoal }) => {
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  });

  const categories = [
    'Travel', 'Emergency', 'Electronics', 'Real Estate', 
    'Vehicle', 'Education', 'Shopping', 'Retirement', 'Home'
  ];

  const handleSubmit = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.category || !newGoal.deadline) {
      alert('Please fill in all fields');
      return;
    }

    onAddGoal(newGoal);
    setNewGoal({ name: '', targetAmount: '', category: '', deadline: '' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-96 max-w-90vw">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Goal</h3>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Goal name (e.g., Travel Fund - Dubai)"
            value={newGoal.name}
            onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Amount (KSH)
            </label>
            <input
              type="number"
              placeholder="e.g., 150000"
              value={newGoal.targetAmount}
              onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={newGoal.category}
            onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Deadline
            </label>
            <input
              type="date"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-lg hover:from-amber-700 hover:to-yellow-700 transition-all"
          >
            Add Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGoalModal;