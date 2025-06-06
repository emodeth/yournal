import { createContext, useContext, useState } from "react";
import { login, logout, register } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  function handleLogin(e, email, password) {
    e.preventDefault();
    login(email, password);
  }

  function handleLogout(e) {
    e.preventDefault();
    logout();
  }

  function handleRegister(e, email, password, name) {
    e.preventDefault();
    register(email, password, name);
  }

  return (
    <AuthContext.Provider
      value={{
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
