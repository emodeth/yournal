import { createContext, useContext, useState } from "react";
import { login, logout, register } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  function resetLoginForm() {
    setEmail("");
    setPassword("");
    setName("");
    setError("");
  }

  async function handleLogin(e, email, password, navigate) {
    e.preventDefault();
    const res = await login(email, password);
    if (res.message === "Login successful") {
      setUser(res.user);
      resetLoginForm();
      navigate("/dashboard");
    } else {
      setError(res.message);
    }
  }

  async function handleLogout(e, navigate) {
    e.preventDefault();
    const res = await logout();

    if (res.message === "Logged out successfully") {
      navigate("/login");
      setUser(null);
      resetLoginForm();
    } else {
      setError(res.message);
    }
  }

  async function handleRegister(e, email, password, name, navigate) {
    e.preventDefault();
    const res = await register(email, password, name);

    if (res.message === "Signup successful") {
      setUser(res.user);
      resetLoginForm();
      navigate("/dashboard");
    } else {
      setError(res.message);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        email,
        setEmail,
        password,
        setPassword,
        name,
        setName,
        error,
        setError,
        isLogin,
        setIsLogin,
        loading,
        setLoading,
        handleLogin,
        handleLogout,
        handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context) {
    return context;
  } else {
    throw new Error("use useAuth within AuthProvider context");
  }
}
