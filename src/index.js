import React from "react";
import ReactDOM from "react-dom/client";
import "react-confirm-alert/src/react-confirm-alert.css"

import { BrowserRouter } from "react-router-dom";

import App from "./App"
import "./App.css"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)