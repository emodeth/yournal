import { useAuth } from "../contexts/AuthContext";
import Logo from "./Logo";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Link, useNavigate } from "react-router";
import { getUsernameFromEmail } from "../lib/utils";

import { Home, BookOpen, Plus, LogOut } from "lucide-react";

const navItems = [
  { path: "/dashboard", icon: Home, label: "Dashboard" },
  { path: "/collections", icon: BookOpen, label: "Collections" },
  { path: "/write", icon: Plus, label: "New Entry" },
];

function Navbar() {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  function renderNavigations() {
    return user ? (
      <div className="items-center space-x-8 hidden lg:flex">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === path
                ? "text-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    ) : null;
  }

  return (
    <nav className="sticky z-[100] h-16 inset-x-0 top-0 w-full bg-white/75 border-b-gray-200 border-b backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between border-b-zinc-200">
          <Link className="z-40" to="/">
            <Logo />
          </Link>

          {renderNavigations()}

          <div className="h-full flex items-center gap-4">
            {user ? (
              <>
                <span>{getUsernameFromEmail(user.email)}</span>

                <button
                  onClick={(e) => handleLogout(e, navigate)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="cursor-pointer px-6 py-2.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full hover:shadow-lg transition-all duration-200 font-medium">
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default Navbar;
