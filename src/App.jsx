// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Stats from "./components/Stats";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css"; // Import the CSS file

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/" element={<Login />} /> {/* الصفحة الافتراضية */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
