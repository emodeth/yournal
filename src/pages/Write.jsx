import Editor from "@/components/Editor";
import { useEditor } from "../contexts/EditorContext";

function Write() {
  const { title } = useEditor();

  return (
    <div className=" h-screen grid grid-cols-[16%_84%]">
      <div className="w-full h-full bg-[#f8f8f8] p-4">{title}</div>
      <Editor />
    </div>
  );
}

export default Write;
