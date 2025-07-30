import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Overview from './components/Overview';
import GoalCard from './components/GoalCard';
import AddGoalModal from './components/AddGoalModal';
import DepositModal from './components/DepositModal';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

const API_BASE = 'http://localhost:3000';

const App = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [depositGoal, setDepositGoal] = useState(null);

  // Fetch goals from API
  const fetchGoals = async () => {
    try {
      const response = await fetch(`${API_BASE}/goals`);
      if (!response.ok) throw new Error('Failed to fetch goals');
      const data = await response.json();
      setGoals(data);
    } catch (err) {
      setError('Unable to connect to server. Make sure json-server is running on port 3000.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // Create new goal
  const createGoal = async (goalData) => {
    try {
      const newGoal = {
        ...goalData,
        id: Date.now().toString(),
        savedAmount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };

      const response = await fetch(`${API_BASE}/goals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoal)
      });

      if (!response.ok) throw new Error('Failed to create goal');
      
      const createdGoal = await response.json();
      setGoals(prev => [...prev, createdGoal]);
      setShowAddForm(false);
      setEditingGoal(null);
    } catch (err) {
      setError('Failed to create goal');
    }
  };

  // Update existing goal
  const updateGoal = async (id, updates) => {
    try {
      const response = await fetch(`${API_BASE}/goals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      if (!response.ok) throw new Error('Failed to update goal');
      
      const updatedGoal = await response.json();
      setGoals(prev => prev.map(goal => goal.id === id ? updatedGoal : goal));
    } catch (err) {
      setError('Failed to update goal');
    }
  };

  // Delete goal
  const deleteGoal = async (id) => {
    if (!window.confirm('Are you sure you want to delete this goal?')) return;
    
    try {
      const response = await fetch(`${API_BASE}/goals/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete goal');
      
      setGoals(prev => prev.filter(goal => goal.id !== id));
    } catch (err) {
      setError('Failed to delete goal');
    }
  };

  // Make deposit
  const makeDeposit = async (goalId, amount) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;

    const newSavedAmount = goal.savedAmount + parseFloat(amount);
    await updateGoal(goalId, { savedAmount: newSavedAmount });
    setDepositGoal(null);
  };

  // Handle edit goal
  const startEdit = (goal) => {
    setEditingGoal(goal);
    setShowAddForm(true);
  };

  // Close modals
  const closeModals = () => {
    setShowAddForm(false);
    setEditingGoal(null);
    setDepositGoal(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="app">
      <Navbar onAddGoal={() => setShowAddForm(true)} />
      
      <main className="main-content">
        {error && <ErrorMessage message={error} />}
        
        <Overview goals={goals} />
        
        <div className="goals-grid">
          {goals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={startEdit}
              onDelete={deleteGoal}
              onDeposit={setDepositGoal}
            />
          ))}
        </div>

        {goals.length === 0 && !loading && (
          <EmptyState onAddGoal={() => setShowAddForm(true)} />
        )}
      </main>

      {showAddForm && (
        <AddGoalModal
          editingGoal={editingGoal}
          onSave={editingGoal ? updateGoal : createGoal}
          onClose={closeModals}
        />
      )}

      {depositGoal && (
        <DepositModal
          goal={depositGoal}
          onDeposit={makeDeposit}
          onClose={() => setDepositGoal(null)}
        />
      )}
    </div>
  );
};

export default App;