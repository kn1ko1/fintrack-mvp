import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthPage: React.FC = () => {
  const [view, setView] = useState<"login" | "register">("login");

  return (
    <div>
      {view === "login" ? <Login /> : <Register />}
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        {view === "login" ? (
          <>
            Don’t have an account?{" "}
            <button onClick={() => setView("register")} style={linkStyle}>
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button onClick={() => setView("login")} style={linkStyle}>
              Login
            </button>
          </>
        )}
      </p>
    </div>
  );
};

const linkStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "var(--accent)",
  fontWeight: "bold",
  cursor: "pointer",
};

export default AuthPage;
