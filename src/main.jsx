import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Home from "./pages/Home.jsx";
import Write from "./pages/Write.jsx";
import Login from "./pages/Login.jsx";
import { EditorProvider } from "./contexts/EditorContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <EditorProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<Write />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </EditorProvider>
    </AuthProvider>
  </StrictMode>
);
