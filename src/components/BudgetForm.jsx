import { useState } from "react";
import { createBudget } from "../services/api";
import { getToken } from "../utils/auth";

const BudgetForm = ({ onBudgetAdded }) => {
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const newBudget = { category, limit, startDate, endDate };
      await createBudget(token, newBudget);
      onBudgetAdded(); // Refresh list after adding
    } catch (error) {
      console.error("Error adding budget:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
      <input type="number" placeholder="Limit" value={limit} onChange={(e) => setLimit(e.target.value)} required />
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <button type="submit">Add Budget</button>
    </form>
  );
};

export default BudgetForm;
