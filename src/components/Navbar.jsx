import Logo from "./Logo";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="sticky z-[100] h-16 inset-x-0 top-0 w-full bg-white/75 border-b-gray-200 border-b backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between border-b-zinc-200">
          <Link className="z-40" to="/">
            <Logo />
          </Link>
          <div className="h-full flex items-center gap-4">
            <Link to="/login">
              <button className="cursor-pointer px-6 py-2.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full hover:shadow-lg transition-all duration-200 font-medium">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default Navbar;
