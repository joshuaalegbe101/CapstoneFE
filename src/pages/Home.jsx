import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      <p>Track your spending, manage budgets, and stay in control of your finances.</p>
      
      <div>
        <Link to="/register">
          <button>Sign Up</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
