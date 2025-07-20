'use client';
import React, { useState } from 'react';

const DepositModal = ({ goal, onClose, onDeposit }) => {
  const [depositAmount, setDepositAmount] = useState('');

  const formatKSH = (amount) => {
    return `KSH ${amount.toLocaleString()}`;
  };

  const handleDeposit = () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    onDeposit(depositAmount);
  };

  const remainingAmount = goal.targetAmount - goal.savedAmount;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-96">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Make Deposit</h3>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-gray-600 mb-2">Depositing to:</p>
          <h4 className="font-semibold text-lg text-gray-800">{goal.name}</h4>
          
          <div className="mt-3 text-sm text-gray-600">
            <p>Current savings: {formatKSH(goal.savedAmount)}</p>
            <p>Target amount: {formatKSH(goal.targetAmount)}</p>
            <p className="font-semibold text-amber-600">
              Remaining: {formatKSH(remainingAmount)}
            </p>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deposit Amount (KSH)
          </label>
          <input
            type="number"
            placeholder="Enter amount (e.g., 5000)"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            min="1"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleDeposit}
            className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-lg hover:from-amber-700 hover:to-yellow-700 transition-all"
          >
            Deposit KSH {depositAmount ? parseFloat(depositAmount).toLocaleString() : '0'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
