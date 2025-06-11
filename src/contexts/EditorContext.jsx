import { BlockNoteEditor } from "@blocknote/core";
import { createContext, useContext, useMemo, useRef, useState } from "react";
import { createEntry, updateEntry } from "../api/entries";
import { useCollections } from "./CollectionsContext";
import { useAuth } from "./AuthContext";

const EditorContext = createContext();

export function EditorProvider({ children }) {
  //sidebar

  const [sidebarOpened, setSidebarOpened] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCollections, setExpandedCollections] = useState(new Set());

  //editor
  const [initialContent, setInitialContent] = useState("loading");
  const [activeEntry, setActiveEntry] = useState();

  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);

  const [title, setTitle] = useState("");
  const titleRef = useRef();
  const [cover, setCover] = useState(null);
  const [showCollectionSelector, setShowCollectionSelector] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedMoodScore, setSelectedMoodScore] = useState([5]);
  const [showChangeCover, setShowChangeCover] = useState(false);

  const { handleGetCollections } = useCollections();
  const { user } = useAuth();

  async function handleCreateEntry(
    userId,
    title,
    content,
    coverImg,
    moodId,
    entryMoodScore,
    collectionId,
    navigate
  ) {
    const data = await createEntry(
      userId,
      title,
      content,
      coverImg,
      moodId,
      entryMoodScore,
      collectionId
    );
    handleGetCollections(user?.id);
    navigate(`/write/${data.entry_id}`);
    return data;
  }

  async function handleUpdateEntry(
    entryId,
    userId,
    title,
    content,
    coverImg,
    moodId,
    entryMoodScore,
    collectionId
  ) {
    const data = await updateEntry(
      entryId,
      userId,
      title,
      content,
      coverImg,
      moodId,
      entryMoodScore,
      collectionId
    );
    handleGetCollections(user?.id);

    return data;
  }

  return (
    <EditorContext.Provider
      value={{
        editor,
        titleRef,
        title,
        setTitle,
        cover,
        setCover,
        sidebarOpened,
        setSidebarOpened,
        searchTerm,
        setSearchTerm,
        expandedCollections,
        setExpandedCollections,
        showCollectionSelector,
        setShowCollectionSelector,
        selectedCollection,
        setSelectedCollection,
        showMoodSelector,
        setShowMoodSelector,
        selectedMood,
        setSelectedMood,
        handleCreateEntry,
        activeEntry,
        setActiveEntry,
        setInitialContent,
        handleUpdateEntry,
        selectedMoodScore,
        setSelectedMoodScore,
        showChangeCover,
        setShowChangeCover,
      }}
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
