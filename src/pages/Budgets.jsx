import { useState } from "react";
import BudgetList from "../components/BudgetList";
import BudgetForm from "../components/BudgetForm";

const Budgets = () => {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h1>Manage Budgets</h1>

      {/* 🔹 Add Budget Button */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Budget"}
      </button>

      {/* 🔹 Show BudgetForm When Button is Clicked */}
      {showForm && (
        <div>
          <h2>Add a New Budget</h2>
          <BudgetForm onBudgetAdded={() => {
            setShowForm(false); 
            setRefresh(!refresh); 
          }} />
        </div>
      )}

      <h2>Existing Budgets</h2>
      <BudgetList refresh={refresh} />
    </div>
  );
};

export default Budgets;
