import React, { useEffect, useState } from "react";
import PredictorForm from "../components/PredictorForm";

type DashboardData = {
  debt: number;
  income: number;
  expenses: number;
  investments: number;
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);

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
    </div>
  );
};

export default Dashboard;
