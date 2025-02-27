import { useState } from "react";
import { createTransaction } from "../services/api";
import { getToken } from "../utils/auth";

const TransactionForm = ({ onTransactionAdded }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const newTransaction = { category, amount, type, note };
      await createTransaction(token, newTransaction);
      onTransactionAdded();
    } catch (error) {
      console.error("Error adding transaction:", error);
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
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
