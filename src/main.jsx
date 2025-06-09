import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { EditorProvider } from "./contexts/EditorContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { DashboardProvider } from "./contexts/DashboardContext.jsx";
import App from "./components/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DashboardProvider>
        <EditorProvider>
          <App />
        </EditorProvider>
      </DashboardProvider>
    </AuthProvider>
  </StrictMode>
);
