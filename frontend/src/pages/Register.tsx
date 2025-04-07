import React, { useState } from "react";
import axios from "axios";
import "./AuthForm.css";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        email,
        password,
      });
      setSuccess(res.data.message || "Registered successfully!");
      setError(null);
    } catch (err: any) {
      setError("Registration failed. Email might already be in use.");
      setSuccess(null);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Create Account</h2>
      <p className="auth-subtitle">Start managing your finances today</p>
      <form className="auth-form" onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}
      </form>
    </div>
  );
};

export default Register;
