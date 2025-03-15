import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router> {/* Wrap App with BrowserRouter */}
      <App />
    </Router>
  </React.StrictMode>
);

