import { useEffect, useState } from "react";
import { fetchBudgets, deleteBudget } from "../services/api";
import { getToken } from "../utils/auth";

const BudgetList = ({ refresh }) => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const loadBudgets = async () => {
      try {
        const token = getToken();
        if (token) {
          const res = await fetchBudgets(token);
          setBudgets(res.data);
        }
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    loadBudgets();
  }, [refresh]);


  const handleDelete = async (id) => {
    try {
      const token = getToken();
      await deleteBudget(token, id);
      setBudgets((prev) => prev.filter((budget) => budget._id !== id));
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  return (
    <div>
      <h2>Existing Budgets</h2>
      {budgets.length === 0 ? (
        <p>No budgets found.</p>
      ) : (
        <ul>
          {budgets.map((budget) => (
            <li key={budget._id}>
              {budget.category} - ${budget.limit}  
              ({new Date(budget.startDate).toLocaleDateString()} to {new Date(budget.endDate).toLocaleDateString()})
              
              {/* 🔹 Add Delete Button */}
              <button onClick={() => handleDelete(budget._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BudgetList;
