import "@blocknote/react/style.css";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import { cn } from "@/lib/utils";
import { useEditor } from "../contexts/EditorContext";

import EditorCover from "./EditorCover";
import EditorTitle from "./EditorTitle";
import EditorHeader from "./EditorHeader";

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
    <div className="flex flex-col overflow-y-auto">
      <EditorHeader />
      <div>
        <EditorCover />
        <div className="pt-20 px-56 max-h-screen  pb-8">
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
    </div>
  );
}

export default Editor;
