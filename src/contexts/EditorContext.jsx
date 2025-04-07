import { useCreateBlockNote } from "@blocknote/react";
import { createContext, useContext, useRef, useState } from "react";

const EditorContext = createContext();

export function EditorProvider({ children }) {
  const [title, setTitle] = useState("");
  const editor = useCreateBlockNote();
  const titleRef = useRef();
  const [cover, setCover] = useState(null);

  return (
    <EditorContext.Provider
      value={{ editor, titleRef, title, setTitle, cover, setCover }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
}
