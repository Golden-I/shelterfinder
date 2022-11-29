import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Reset from "./Pages/Reset";
import Dashboard from "./Pages/DashBoard";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
export default App;
