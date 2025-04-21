import { useEditor } from "../contexts/EditorContext";

function EditorHeader() {
  const { title } = useEditor();

  return (
    <div className="h-11 flex items-center px-3 py-2 sticky top-0 border-b  bg-white z-[9999] border-b-[#e5e5e5] font-[Inter] ">
      <p className="px-1 text-[14px]">{title || "Untitled"}</p>
    </div>
  );
}

export default EditorHeader;
