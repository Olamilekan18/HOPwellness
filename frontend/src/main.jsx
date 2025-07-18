import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./route.jsx";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>
);
