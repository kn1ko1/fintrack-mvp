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
    <div style={styles.page}>
      <header style={styles.header}>
        <h1>📊 Finance Overview</h1>
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </header>
  
      <section style={styles.grid}>
        <div style={styles.card}>
          <h3>Total Debt</h3>
          <p>£{data.debt.toLocaleString()}</p>
        </div>
        <div style={styles.card}>
          <h3>Monthly Income</h3>
          <p>£{data.income.toLocaleString()}</p>
        </div>
        <div style={styles.card}>
          <h3>Monthly Expenses</h3>
          <p>£{data.expenses.toLocaleString()}</p>
        </div>
        <div style={styles.card}>
          <h3>Investments</h3>
          <p>£{data.investments.toLocaleString()}</p>
        </div>
      </section>
  
      <section style={styles.form}>
        <PredictorForm />
      </section>
    </div>
  );
  
};

const styles = {
  page: {
    padding: "2rem",
    fontFamily: "'Segoe UI', sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  logout: {
    padding: "10px 20px",
    backgroundColor: "#ff5400",
    border: "none",
    borderRadius: "6px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  form: {
    marginTop: "2rem",
  }
};

export default Dashboard;
