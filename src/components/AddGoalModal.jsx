import React, { useState, useEffect } from 'react';

const AddGoalModal = ({ editingGoal, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  });

  const categories = [
    'Travel', 'Emergency', 'Electronics', 'Real Estate', 'Vehicle',
    'Education', 'Shopping', 'Retirement', 'Home', 'Other'
  ];

  useEffect(() => {
    if (editingGoal) {
      setFormData({
        name: editingGoal.name,
        targetAmount: editingGoal.targetAmount.toString(),
        category: editingGoal.category,
        deadline: editingGoal.deadline
      });
    }
  }, [editingGoal]);

  const handleSubmit = () => {
    if (!formData.name || !formData.targetAmount || !formData.category || !formData.deadline) {
      return;
    }
    
    const goalData = {
      ...formData,
      targetAmount: parseFloat(formData.targetAmount)
    };

    if (editingGoal) {
      onSave(editingGoal.id, goalData);
    } else {
      onSave(goalData);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {editingGoal ? 'Edit Goal' : 'Add New Goal'}
          </h2>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Goal Name</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Emergency Fund"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Target Amount ($)</label>
            <input
              type="number"
              className="form-input"
              min="1"
              step="0.01"
              value={formData.targetAmount}
              onChange={(e) => handleInputChange('targetAmount', e.target.value)}
              placeholder="1000"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Deadline</label>
            <input
              type="date"
              className="form-input"
              value={formData.deadline}
              onChange={(e) => handleInputChange('deadline', e.target.value)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={handleSubmit} className="btn btn-primary">
            {editingGoal ? 'Update Goal' : 'Create Goal'}
          </button>
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGoalModal;