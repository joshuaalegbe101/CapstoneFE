import { useState, useEffect } from "react";
import { createTransaction, updateTransaction } from "../services/api";
import { getToken } from "../utils/auth";

const TransactionForm = ({ onTransactionAdded, editTransaction }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [note, setNote] = useState("");
  const [transactionId, setTransactionId] = useState(null);

  // Fill form when editing
  useEffect(() => {
    if (editTransaction) {
      setCategory(editTransaction.category);
      setAmount(editTransaction.amount);
      setType(editTransaction.type);
      setNote(editTransaction.note);
      setTransactionId(editTransaction._id);
    }
  }, [editTransaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const transactionData = { category, amount, type, note };

      if (transactionId) {
        // Update transaction
        await updateTransaction(token, transactionId, transactionData);
      } else {
        // Create new transaction
        await createTransaction(token, transactionData);
      }

      onTransactionAdded();
      setCategory("");
      setAmount("");
      setType("expense");
      setNote("");
      setTransactionId(null);
    } catch (error) {
      console.error("Error submitting transaction:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input type="text" placeholder="Note" value={note} onChange={(e) => setNote(e.target.value)} />
      <button type="submit">{transactionId ? "Update Transaction" : "Add Transaction"}</button>
    </form>
  );
};

export default TransactionForm;
