"use client";

export default function GoalSummary({ totalSaved, completedGoals, totalGoals }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <div className="bg-white shadow rounded-lg p-4 flex-1 text-center">
        <h2 className="text-xl font-semibold text-gray-700">Total Saved</h2>
        <p className="text-2xl text-green-600 font-bold">
          ${totalSaved.toLocaleString()}
        </p>
      </div>
      <div className="bg-white shadow rounded-lg p-4 flex-1 text-center">
        <h2 className="text-xl font-semibold text-gray-700">Completed Goals</h2>
        <p className="text-2xl text-blue-600 font-bold">{completedGoals}</p>
      </div>
      <div className="bg-white shadow rounded-lg p-4 flex-1 text-center">
        <h2 className="text-xl font-semibold text-gray-700">Total Goals</h2>
        <p className="text-2xl text-purple-600 font-bold">{totalGoals}</p>
      </div>
    </div>
  );
}
