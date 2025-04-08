import React, { useState } from "react";
import axios from "axios";
import "./AuthForm.css";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      const token = res.data.token;
      localStorage.setItem("token", token);
      setSuccess("Login successful!");
      setError(null);
      navigate("/dashboard"); // ✅ Only happens on successful login
    } catch (err: any) {
      setError("Invalid credentials. Please try again.");
      setSuccess(null);
    }
  };
  
  return (
    <div className="auth-container">
      <h2 className="auth-title">Welcome Back</h2>
      <p className="auth-subtitle">Login to your FinTrack dashboard</p>
      <form className="auth-form" onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}
      </form>
    </div>
  );
};

export default Login;
