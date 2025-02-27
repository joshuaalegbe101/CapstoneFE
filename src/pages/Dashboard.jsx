import { useEffect, useState } from "react";
import { fetchTransactions, fetchBudgets } from "../services/api";
import { getToken } from "../utils/auth";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = getToken();
        if (token) {
          // Fetch budgets
          const budgetRes = await fetchBudgets(token);
          setBudgets(budgetRes.data);
          
          // Calculate total budget
          const budgetTotal = budgetRes.data.reduce((acc, budget) => acc + budget.limit, 0);
          setTotalBudget(budgetTotal);

          // Fetch transactions
          const transactionRes = await fetchTransactions(token);
          setTransactions(transactionRes.data);

          // Calculate total spent
          const spentTotal = transactionRes.data
            .filter((tx) => tx.type === "expense")
            .reduce((acc, tx) => acc + tx.amount, 0);
          setTotalSpent(spentTotal);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Budget Summary */}
      <div>
        <h2>Budget Summary</h2>
        <p>Total Budget: ${totalBudget}</p>
        <p>Total Spent: ${totalSpent}</p>
        <p>Remaining Balance: ${totalBudget - totalSpent}</p>
      </div>

      {/* Recent Transactions */}
      <div>
        <h2>Recent Transactions</h2>
        {transactions.length === 0 ? (
          <p>No recent transactions.</p>
        ) : (
          <ul>
            {transactions.slice(0, 5).map((tx) => (
              <li key={tx._id}>
                {tx.category}: ${tx.amount} ({tx.type})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick Navigation */}
      <div>
        <h2>Quick Links</h2>
        <Link to="/transactions">View All Transactions</Link> | 
        <Link to="/budgets">Manage Budgets</Link>
      </div>
    </div>
  );
};

export default Dashboard;
