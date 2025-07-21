"use client";

import { useState, useEffect } from "react";

export default function GoalForm({ onSave, editingGoal, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    targetAmount: "",
    category: "",
    deadline: "",
  });

  useEffect(() => {
    if (editingGoal) setForm(editingGoal);
  }, [editingGoal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({ name: "", targetAmount: "", category: "", deadline: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editingGoal ? "Edit Goal" : "Add New Goal"}
      </h2>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Goal Name"
        className="w-full p-2 border rounded mb-2"
        required
      />
      <input
        name="targetAmount"
        type="number"
        value={form.targetAmount}
        onChange={handleChange}
        placeholder="Target Amount"
        className="w-full p-2 border rounded mb-2"
        required
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full p-2 border rounded mb-2"
        required
      />
      <input
        name="deadline"
        type="date"
        value={form.deadline}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-purple-600 text-white px-3 py-1 rounded"
        >
          {editingGoal ? "Update Goal" : "Add Goal"}
        </button>
        {editingGoal && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
