import { Link } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import { useState } from "react";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Budget Summary</h2>
      <p>Total Budget: $0</p>
      <p>Total Spent: $0</p>
      <p>Remaining Balance: $0</p>

      <h2>Recent Transactions</h2>
      <p>No recent transactions.</p>

      <h2>Quick Links</h2>
      <Link to="/transactions">View All Transactions</Link> | 
      <Link to="/budgets">Manage Budgets</Link>

      {/* 🔹 Add Transaction Form inside the Dashboard */}
      <div style={{ marginTop: "20px" }}>
        <h2>Add a Transaction</h2>
        <TransactionForm onTransactionAdded={() => setRefresh(!refresh)} />
      </div>
    </div>
  );
};

export default Dashboard;
