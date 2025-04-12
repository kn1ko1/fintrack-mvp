import React, { useState, useEffect } from "react";
import axios from "axios";

type Entry = {
  name: string;
  amount: number;
  type: "income" | "expense";
  frequency: string;
};

const EntryManager: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [form, setForm] = useState<Entry>({
    name: "",
    amount: 0,
    type: "income",
    frequency: "monthly",
  });

  const fetchEntries = async () => {
    const res = await axios.get("http://localhost:5000/api/entries");
    setEntries(res.data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/entries", form);
    setForm({ name: "", amount: 0, type: "income", frequency: "monthly" });
    fetchEntries();
  };

  return (
    <div style={styles.container}>
      <h2>Add Income / Expense</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select name="frequency" value={form.frequency} onChange={handleChange}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="annually">Annually</option>
        </select>
        <button type="submit">Add Entry</button>
      </form>

      <h3>All Entries</h3>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>
            <strong>{entry.type.toUpperCase()}:</strong> {entry.name} – £{entry.amount} ({entry.frequency})
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "2rem",
  },
  form: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap" as const,
    marginBottom: "1rem",
  },
};

export default EntryManager;
