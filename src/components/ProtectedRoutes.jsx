import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoutes() {
  const { user } = useAuth();

  if (user === false) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
