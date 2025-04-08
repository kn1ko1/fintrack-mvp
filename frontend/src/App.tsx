import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}


// import AuthPage from "./pages/AuthPage";

// function App() {
//   return <AuthPage />;
// }


// import Register from "./pages/Register";

// function App() {
//   return <Register />;
// }


// import Login from "./pages/Login";
// function App() {
//   return <Login />;
// }


// import React from "react";
// import Dashboard from "./pages/Dashboard";
// import "./index.css"; // or "./index.css"

// function App() {
//   return (
//     <div className="App">
//       <Dashboard />
//     </div>
//   );
// }

export default App;
