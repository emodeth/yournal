import Logo from "./Logo";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { NotebookPen } from "lucide-react";
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
            <div className="flex items-center justify-center h-full gap-4">
              <Link
                to="/"
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "!font-medium",
                })}
              >
                Log in
              </Link>
            </div>
            {/*
             <div className="w-px h-8 bg-zinc-200 hidden sm:block"></div>
            */}
            <Link
              to="/write"
              className={buttonVariants({
                size: "sm",
                className: "hidden sm:flex !font-medium",
              })}
            >
              <NotebookPen className="h-5 w-5 shrink-0 mr-0.5" />
              Write New
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default Navbar;
