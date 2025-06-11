import { Link } from "react-router";
import Logo from "../components/Logo";
import { ChevronLeft } from "lucide-react";

function SidebarHeader() {
  return (
    <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between ">
      <Link to={"/"}>
        <Logo className={"justify-start"} />
      </Link>

      <Link to={"/collections"}>
        <div className="text-sm flex items-center justify-center gap-1 text-blue-500 hover:text-blue-600  cursor-pointer">
          <span>
            <ChevronLeft size={12} />
          </span>
          collections
        </div>
      </Link>
    </div>
  );
}

export default SidebarHeader;
