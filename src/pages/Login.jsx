import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import Logo from "../components/Logo";

function Login() {
  const {
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    error,
    setError,
    isLogin,
    setIsLogin,
    loading,
    handleLogin,
    handleRegister,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function renderLogo() {
    return (
      <div className="flex align-center">
        <Link to={"/"}>
          <Logo className={"ml-2 mt-2 p-4"} />
        </Link>
      </div>
    );
  }

  function renderHeader() {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          {isLogin ? "Welcome back" : "Create your account"}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {isLogin
            ? "Sign in to continue tracking your mood"
            : "Start your journey to better mental health"}
        </p>
      </div>
    );
  }

  function renderPasswordFied() {
    return (
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white block w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        {!isLogin && (
          <p className="mt-1 text-xs text-gray-500">
            Password must be at least 6 characters
          </p>
        )}
      </div>
    );
  }

  function renderForm() {
    return (
      <form className="mt-8 space-y-6">
        <div className="space-y-4">
          {!isLogin && (
            <div>
              <label
                htmlFor="name\"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required={!isLogin}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {renderPasswordFied()}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          onClick={(e) =>
            isLogin
              ? handleLogin(e, email, password, navigate)
              : handleRegister(e, email, password, name, navigate)
          }
          className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setEmail("");
              setPassword("");
              setName("");
            }}
            className="cursor-pointer text-sm text-blue-600 hover:text-blue-500"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 !max-h-screen overflow-hidden min-h-screen">
      {renderLogo()}
      <div className=" flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {renderHeader()}
          {renderForm()}
        </div>
      </div>
    </div>
  );
}

export default Login;
