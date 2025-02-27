import { useEffect, useState } from "react";
import { fetchTransactions } from "../services/api";
import { getToken } from "../utils/auth";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

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
  }, []);

  return (
    <div>
      <h2>Your Transactions</h2>
      <ul>
        {transactions.map((tx) => (
          <li key={tx._id}>
            {tx.category} - ${tx.amount} ({tx.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
