import { useEffect, useState } from "react";
import { fetchBudgets } from "../services/api";
import { getToken } from "../utils/auth";

const Budgets = () => {
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
  }, []);

  return (
    <div>
      <h2>Your Budgets</h2>
      <ul>
        {budgets.map((budget) => ( 
          <li key={budget._id}>
            {budget.category} - ${budget.limit} ({budget.startDate} to {budget.endDate})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Budgets;
