import { useEffect, useState } from "react";
import { fetchTransactions, deleteTransaction } from "../services/api";
import { getToken } from "../utils/auth";

const TransactionList = ({ refresh, onEdit }) => {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions on component mount or when refresh changes
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const token = getToken();
        if (token) {
          const res = await fetchTransactions(token);
          setTransactions(res.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    loadTransactions();
  }, [refresh]); // 🔥 Reacts to changes in `refresh`

  // Delete a transaction
  const handleDelete = async (id) => {
    try {
      const token = getToken();
      await deleteTransaction(token, id);
      setTransactions((prev) => prev.filter((tx) => tx._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div>
      <h2>All Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((tx) => (
            <li key={tx._id}>
              {tx.category} - ${tx.amount} ({tx.type}) - {new Date(tx.date).toLocaleDateString()}
              
              {/* 🔹 Add Update and Delete Buttons */}
              <button onClick={() => onEdit(tx)}>Update</button>
              <button onClick={() => handleDelete(tx._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
