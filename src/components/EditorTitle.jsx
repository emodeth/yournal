import { useEffect } from "react";
import { useEditor } from "../contexts/EditorContext";
import { cn } from "@/lib/utils";
import TextareaAutosize from "react-textarea-autosize";
import EditorControls from "./EditorControls";

function EditorTitle({ classNameTitle }) {
  const { editor, titleRef, title, setTitle } = useEditor();

  function handleDocumentTitleChange(title) {
    if (title) {
      document.title = title;
    } else {
      document.title = "Yournal";
    }
  }

  function handleKeyDownTitle(e) {
    if (e.code === "Enter") {
      e.preventDefault();
      editor.focus();
    }
  }

  useEffect(() => {
    handleDocumentTitleChange(title);
  }, [title]);

  return (
    <div className="flex flex-col items-center px-[54px] group ">
      <EditorControls />
      <TextareaAutosize
        ref={titleRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={cn(
          "w-full resize-none appearance-none overflow-hidden bg-transparent text-[40px] font-bold focus:outline-none text-[#3f3f3f] mb-2",
          classNameTitle
        )}
        placeholder="Untitled"
        onKeyDown={handleKeyDownTitle}
      />
    </div>
  );
}

export default EditorTitle;
