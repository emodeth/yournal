import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App.jsx";
import { EditorProvider } from "./contexts/EditorContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { DashboardProvider } from "./contexts/DashboardContext.jsx";
import { CollectionsProvider } from "./contexts/CollectionsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DashboardProvider>
        <CollectionsProvider>
          <EditorProvider>
            <App />
          </EditorProvider>
        </CollectionsProvider>
      </DashboardProvider>
    </AuthProvider>
  </StrictMode>
);
