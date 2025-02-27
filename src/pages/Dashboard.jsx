import { Link } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import { useState } from "react";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container"> 
      <h1>Dashboard</h1>

      <h2>Recent Transactions</h2>
      <p>No recent transactions.</p>

      <h2>Quick Links</h2>
      <Link to="/transactions">View All Transactions</Link> | 
      <Link to="/budgets">Manage Budgets</Link>

      <div style={{ marginTop: "20px" }}>
        <h2>Add a Transaction</h2>
        <TransactionForm onTransactionAdded={() => setRefresh(!refresh)} />
      </div>
    </div>
  );
};

export default Dashboard;
