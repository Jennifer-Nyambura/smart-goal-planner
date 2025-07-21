"use client";

import { useState } from "react";
import DepositForm from "./DepositForm";

export default function GoalCard({ goal, onEdit, onDelete, onDeposit }) {
  const [showDeposit, setShowDeposit] = useState(false);
  const percent = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
  const isCompleted = goal.savedAmount >= goal.targetAmount;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold">{goal.name}</h3>
      <p>Category: {goal.category}</p>
      <p>Target: ${goal.targetAmount}</p>
      <p>Saved: ${goal.savedAmount}</p>

      <div className="w-full bg-gray-200 rounded-full h-3 my-2">
        <div
          className={`h-3 rounded-full ${isCompleted ? "bg-green-500" : "bg-purple-500"}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <p>{isCompleted ? "🎉 Completed!" : `${percent.toFixed(0)}% saved`}</p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={onEdit}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
        <button
          onClick={() => setShowDeposit(!showDeposit)}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Deposit
        </button>
      </div>

      {showDeposit && (
        <DepositForm
          goalId={goal.id}
          onDeposit={onDeposit}
          onClose={() => setShowDeposit(false)}
        />
      )}
    </div>
  );
}
