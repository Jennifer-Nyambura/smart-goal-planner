"use client";

import { useEffect, useState } from "react";
import GoalCard from "./GoalCard";
import GoalForm from "./GoalForm";
import DepositForm from "./DepositForm";

export default function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);

  const fetchGoals = () => {
    fetch("http://localhost:3001/goals")
      .then((res) => res.json())
      .then(setGoals)
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleSaveGoal = (goal) => {
    if (editingGoal) {
      fetch(`http://localhost:3001/goals/${editingGoal.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goal),
      }).then(() => {
        fetchGoals();
        setEditingGoal(null);
      });
    } else {
      fetch("http://localhost:3001/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...goal, savedAmount: 0, createdAt: new Date() }),
      }).then(fetchGoals);
    }
  };

  const handleDeleteGoal = (id) => {
    fetch(`http://localhost:3001/goals/${id}`, {
      method: "DELETE",
    }).then(fetchGoals);
  };

  const handleDeposit = (goalId, amount) => {
    const goal = goals.find((g) => g.id === goalId);
    const updatedAmount = Number(goal.savedAmount) + Number(amount);
    fetch(`http://localhost:3001/goals/${goalId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedAmount: updatedAmount }),
    }).then(fetchGoals);
  };

  // Summary
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completedGoals = goals.filter((g) => g.savedAmount >= g.targetAmount).length;

  return (
    <main className="p-6">
      <h1 className="text-4xl text-center text-purple-800 font-bold mb-6">
         Smart Goal Planner
      </h1>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow text-center">
          <h2 className="text-lg font-semibold">Total Saved</h2>
          <p className="text-2xl text-green-600 font-bold">${totalSaved}</p>
        </div>
        <div className="p-4 bg-white rounded shadow text-center">
          <h2 className="text-lg font-semibold">Completed Goals</h2>
          <p className="text-2xl text-blue-600 font-bold">{completedGoals}</p>
        </div>
        <div className="p-4 bg-white rounded shadow text-center">
          <h2 className="text-lg font-semibold">Total Goals</h2>
          <p className="text-2xl text-purple-600 font-bold">{goals.length}</p>
        </div>
      </div>

      <GoalForm
        onSave={handleSaveGoal}
        editingGoal={editingGoal}
        onCancel={() => setEditingGoal(null)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onEdit={() => setEditingGoal(goal)}
            onDelete={() => handleDeleteGoal(goal.id)}
            onDeposit={handleDeposit}
          />
        ))}
      </div>
    </main>
  );
}
