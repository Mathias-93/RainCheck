import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalState from "./Context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalState>
      <App />
    </GlobalState>
  </StrictMode>
);
