import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App.jsx";
import { EditorProvider } from "./contexts/EditorContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { CollectionsProvider } from "./contexts/CollectionsContext.jsx";
import { EntriesProvider } from "./contexts/EntriesContext.jsx";
import { MoodProvider } from "./contexts/MoodContext.jsx";
import { DashboardProvider } from "./contexts/DashboardContext.jsx";

createRoot(document.getElementById("root")).render(
    <AuthProvider>
      <DashboardProvider>
        <CollectionsProvider>
          <EntriesProvider>
            <EditorProvider>
              <MoodProvider>
                <App />
              </MoodProvider>
            </EditorProvider>
          </EntriesProvider>
        </CollectionsProvider>
      </DashboardProvider>
    </AuthProvider>
);
