import React, { useState } from 'react';

const DepositModal = ({ goal, onDeposit, onClose }) => {
  const [depositAmount, setDepositAmount] = useState('');

  const handleDeposit = () => {
    if (depositAmount && parseFloat(depositAmount) > 0) {
      onDeposit(goal.id, depositAmount);
    }
  };

  const remaining = Math.max(goal.targetAmount - goal.savedAmount, 0);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Make Deposit to {goal.name}</h2>
        </div>
        
        <div className="modal-body">
          <div className="deposit-info">
            <div className="info-row">
              <span className="info-label">Current:</span>
              <span className="info-value">
                ${goal.savedAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Remaining:</span>
              <span className="info-value">${remaining.toLocaleString()}</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Deposit Amount ($)</label>
            <input
              type="number"
              className="form-input"
              min="0.01"
              step="0.01"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="100.00"
              autoFocus
            />
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={handleDeposit} className="btn btn-success">
            Make Deposit
          </button>
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;