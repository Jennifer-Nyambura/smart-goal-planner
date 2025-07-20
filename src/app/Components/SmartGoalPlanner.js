// src/components/SmartGoalPlanner.js
import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import Overview from './OverView';
import GoalsView from './GoalsView';
import AddGoalModal from './AddGoalModal';
import DepositModal from './DepositModal';
import EditGoalModal from './EditGoalModal';

const SmartGoalPlanner = () => {
  const [goals, setGoals] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [editingGoal, setEditingGoal] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Initial sample data (simulating db.json)
  const initialGoals = [
    {
      id: "1",
      name: "Travel Fund - Japan",
      targetAmount: 750000, // KSH 750,000
      savedAmount: 480000,  // KSH 480,000
      category: "Travel",
      deadline: "2025-12-31",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Emergency Fund",
      targetAmount: 1500000, // KSH 1.5M
      savedAmount: 1125000,  // KSH 1.125M
      category: "Emergency",
      deadline: "2026-06-30",
      createdAt: "2023-05-01"
    },
    {
      id: "3",
      name: "New Laptop",
      targetAmount: 225000,   // KSH 225,000
      savedAmount: 225000,   // KSH 225,000 (completed)
      category: "Electronics",
      deadline: "2024-07-20",
      createdAt: "2024-03-10"
    },
    {
      id: "4",
      name: "Down Payment - House",
      targetAmount: 7500000,  // KSH 7.5M
      savedAmount: 1800000,   // KSH 1.8M
      category: "Real Estate",
      deadline: "2027-12-31",
      createdAt: "2024-02-01"
    },
    {
      id: "5",
      name: "Car Maintenance",
      targetAmount: 120000,   // KSH 120,000
      savedAmount: 90000,     // KSH 90,000
      category: "Vehicle",
      deadline: "2025-09-15",
      createdAt: "2024-06-01"
    }
  ];

  useEffect(() => {
    // Simulate fetching from db.json
    setGoals(initialGoals);
  }, []);

  // Calculate overview stats
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount);
  const overdueGoals = goals.filter(goal => {
    const deadline = new Date(goal.deadline);
    const today = new Date();
    return deadline < today && goal.savedAmount < goal.targetAmount;
  });

  const addGoal = (newGoalData) => {
    const goal = {
      id: Date.now().toString(),
      name: newGoalData.name,
      targetAmount: parseFloat(newGoalData.targetAmount),
      savedAmount: 0,
      category: newGoalData.category,
      deadline: newGoalData.deadline,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setGoals([...goals, goal]);
    setShowAddModal(false);
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const makeDeposit = (amount) => {
    if (!selectedGoal || !amount) return;

    const depositValue = parseFloat(amount);
    setGoals(goals.map(goal => 
      goal.id === selectedGoal.id 
        ? { ...goal, savedAmount: goal.savedAmount + depositValue }
        : goal
    ));

    setDepositAmount('');
    setSelectedGoal(null);
    setShowDepositModal(false);
  };

  const updateGoal = (updatedGoal) => {
    setGoals(goals.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
    setEditingGoal(null);
  };

  const openDepositModal = (goal) => {
    setSelectedGoal(goal);
    setShowDepositModal(true);
  };

  const openEditModal = (goal) => {
    setEditingGoal({...goal});
  };

  const stats = {
    totalGoals,
    totalSaved,
    completedGoals: completedGoals.length,
    overdueGoals: overdueGoals.length
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setShowAddModal={setShowAddModal}
        stats={stats}
      />

      <div className="flex-1 p-8 overflow-auto">
        {activeTab === 'overview' && (
          <Overview 
            goals={goals}
            stats={stats}
          />
        )}

        {activeTab === 'goals' && (
          <GoalsView 
            goals={goals}
            setShowAddModal={setShowAddModal}
            deleteGoal={deleteGoal}
            openDepositModal={openDepositModal}
            openEditModal={openEditModal}
          />
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddGoalModal 
          onClose={() => setShowAddModal(false)}
          onAddGoal={addGoal}
        />
      )}

      {showDepositModal && selectedGoal && (
        <DepositModal 
          goal={selectedGoal}
          onClose={() => {
            setShowDepositModal(false);
            setSelectedGoal(null);
            setDepositAmount('');
          }}
          onDeposit={makeDeposit}
        />
      )}

      {editingGoal && (
        <EditGoalModal 
          goal={editingGoal}
          onClose={() => setEditingGoal(null)}
          onUpdate={updateGoal}
        />
      )}
    </div>
  );
};

export default SmartGoalPlanner;