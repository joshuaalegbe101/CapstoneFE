import TransactionList from "../components/TransactionList";
import TransactionForm from "../components/TransactionForm";
import { useState } from "react";

const Transactions = () => {
  const [refresh, setRefresh] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);

  return (
    <div>

      {/* 🔹 Show form with transaction data if editing */}
      <h2>{editTransaction ? "Edit Transaction" : "Add a New Transaction"}</h2>
      <TransactionForm
        onTransactionAdded={() => {
          setRefresh(!refresh);
          setEditTransaction(null); // Reset after editing
        }}
        editTransaction={editTransaction}
      />

      <TransactionList refresh={refresh} onEdit={(tx) => setEditTransaction(tx)} />
    </div>
  );
};

export default Transactions;
