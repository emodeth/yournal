import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Home from "./pages/Home.jsx";
import Write from "./pages/Write.jsx";
import { EditorProvider } from "./contexts/EditorContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EditorProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </BrowserRouter>
    </EditorProvider>
  </StrictMode>
);
