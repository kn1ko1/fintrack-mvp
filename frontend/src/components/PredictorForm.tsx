import React, { useState } from "react";
import axios from "axios";
import "./PredictorForm.css"; // ✅ Create this CSS file next

const PredictorForm: React.FC = () => {
  const [score, setScore] = useState<string>("");
  const [income, setIncome] = useState<string>("");
  const [expenses, setExpenses] = useState<string>("");
  const [debt, setDebt] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/predict", {
        score: Number(score),
        income: Number(income),
        expenses: Number(expenses),
        debt: Number(debt),
      });
      setResult(response.data.message);
    } catch (error: any) {
      setResult("An error occurred. Please check your inputs.");
      console.error(error);
    }
  };

  return (
    <div className="predictor-form">
      <h2>Predict Your Credit Score</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Current Credit Score:</label>
          <input type="string" value={score} onChange={(e) => setScore(String(e.target.value))} />
        </div>
        <div className="form-group">
          <label>Monthly Income (£):</label>
          <input type="string" value={income} onChange={(e) => setIncome(String(e.target.value))} />
        </div>
        <div className="form-group">
          <label>Monthly Expenses (£):</label>
          <input type="string" value={expenses} onChange={(e) => setExpenses(String(e.target.value))} />
        </div>
        <div className="form-group">
          <label>Total Debt (£):</label>
          <input type="string" value={debt} onChange={(e) => setDebt(String(e.target.value))} />
        </div>
        <button type="submit">Predict Score</button>
      </form>

      {result && <div className="result-box">{result}</div>}
    </div>
  );
};

export default PredictorForm;
export {};
