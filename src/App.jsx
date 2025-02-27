import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
