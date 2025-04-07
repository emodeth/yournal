import "@blocknote/react/style.css";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import { cn } from "@/lib/utils";
import { useEditor } from "../contexts/EditorContext";

import EditorCover from "./EditorCover";
import EditorTitle from "./EditorTitle";

function Editor({ classNameEditor, classNameTitle }) {
  const { editor, titleRef } = useEditor();

  function handleKeyDownEditor(e) {
    if (
      e.code === "Backspace" &&
      !editor.getTextCursorPosition()?.prevBlock &&
      editor.getTextCursorPosition().block.content.length === 0 &&
      editor.getTextCursorPosition().block.type === "paragraph"
    ) {
      e.preventDefault();
      titleRef.current.focus();
    }
  }

  return (
    <div>
      <EditorCover />
      <div className="pt-8 px-36 max-h-screen overflow-y-auto">
        <EditorTitle classNameTitle={classNameTitle} />
        <BlockNoteView
          onKeyDownCapture={handleKeyDownEditor}
          editor={editor}
          editable={true}
          theme="light"
          className={cn("", classNameEditor)}
        />
      </div>
    </div>
  );
}

export default Editor;
