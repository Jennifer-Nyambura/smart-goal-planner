"use client";

import { useState } from "react";

export default function DepositForm({ goalId, onDeposit, onClose }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onDeposit(goalId, amount);
    setAmount("");
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 bg-gray-50 p-3 rounded shadow"
    >
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Deposit Amount"
        className="w-full p-2 border rounded mb-2"
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-3 py-1 rounded w-full"
      >
        Deposit
      </button>
    </form>
  );
}
