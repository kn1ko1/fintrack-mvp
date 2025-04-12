import React, { useEffect, useState } from "react";
import PredictorForm from "../components/PredictorForm";
import { useNavigate } from "react-router-dom";
import { trace } from "console";


type DashboardData = {
  debt: number;
  income: number;
  expenses: number;
  investments: number;
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to fetch dashboard data", err));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Finance Overview</h1>
      <ul>
        <li><strong>Total Debt:</strong> £{data.debt}</li>
        <li><strong>Monthly Income:</strong> £{data.income}</li>
        <li><strong>Monthly Expenses:</strong> £{data.expenses}</li>
        <li><strong>Investments:</strong> £{data.investments}</li>
      </ul>

      <PredictorForm /> {/* 👈 This renders the credit score form */}
      <button onClick={handleLogout} style={styles.button}>Logout</button>
    </div>
  );
};

const styles = {
  container: {
    padding: "3rem",
    textAlign: "left" as const,
  },
  button: {
    marginTop: "2rem",
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "var(--accent)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "var(--accent-hover)",
    }
  },
};

export default Dashboard;
