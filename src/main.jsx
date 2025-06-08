import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { EditorProvider } from "./contexts/EditorContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { DashboardProvider } from "./contexts/DashboardContext.jsx";
import Home from "./pages/Home.jsx";
import Write from "./pages/Write.jsx";
import Login from "./pages/Login.jsx";

import Dashboard from "./pages/Dashboard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DashboardProvider>
        <EditorProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/write" element={<Write />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </EditorProvider>
      </DashboardProvider>
    </AuthProvider>
  </StrictMode>
);
