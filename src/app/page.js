"use client";

import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import GoalForm from "../components/GoalForm";
import GoalCard from "../components/GoalCard";

export default function Home() {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = () => {
    fetch("http://localhost:3001/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Fetch error:", err));
  };

  const handleAddOrUpdateGoal = (goal) => {
    const method = goal.id ? "PATCH" : "POST";
    const url = goal.id
      ? `http://localhost:3001/goals/${goal.id}`
      : "http://localhost:3001/goals";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goal),
    }).then(fetchGoals);
  };

  const handleDeleteGoal = (id) => {
    fetch(`http://localhost:3001/goals/${id}`, { method: "DELETE" }).then(
      fetchGoals
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
        🚀 Smart Goal Planner
      </h1>

      <Dashboard goals={goals} />

      <GoalForm
        onSubmit={handleAddOrUpdateGoal}
        editingGoal={editingGoal}
        setEditingGoal={setEditingGoal}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onEdit={setEditingGoal}
            onDelete={handleDeleteGoal}
            onDeposit={fetchGoals}
          />
        ))}
      </div>
    </main>
  );
}
