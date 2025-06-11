import { useEditor } from "../contexts/EditorContext";
import SidebarContent from "./SidebarContent";
import SidebarHeader from "./SidebarHeader";

function Sidebar() {
  const { sidebarOpened } = useEditor();
  return (
    <div
      className={`${
        sidebarOpened ? "w-80" : "w-0"
      } transition-all duration-300 border-r border-gray-200 bg-[#f8f8f8] flex flex-col overflow-hidden`}
    >
      <SidebarHeader />
      <SidebarContent />
    </div>
  );
}

export default Sidebar;
