import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home.jsx";
import Write from "../pages/Write.jsx";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Collections from "../pages/Collections.jsx";
import DetailedCollection from "../pages/DetailedCollection.jsx";
import ProtectedRoutes from "../components/ProtectedRoutes.jsx";
import { useEffect } from "react";
import { fetchUser } from "../api/auth.js";
import { useAuth } from "../contexts/AuthContext.jsx";

function App() {
  const { setUser } = useAuth();

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:id" element={<DetailedCollection />} />
          <Route path="/write" element={<Write />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
