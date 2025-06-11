import Editor from "@/components/Editor";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";
import { useEditor } from "../contexts/EditorContext";
import { useParams } from "react-router";
import { useEffect } from "react";
import { getEntryById } from "../api/entries";
import { getMoodByMoodId } from "../lib/utils";
import { useMood } from "../contexts/MoodContext";

function Write() {
  const { user } = useAuth();
  const { allMoods } = useMood();
  const {
    editor,
    title,
    setTitle,
    setCover,
    setSelectedMood,
    showCollectionSelector,
    setShowCollectionSelector,
    showMoodSelector,
    setShowMoodSelector,
    setSelectedCollection,
    activeEntry,
    setActiveEntry,
    setInitialContent,
  } = useEditor();

  const { id } = useParams();

  function handleDisplayEntry() {
    const mood = getMoodByMoodId(allMoods, activeEntry.mood_id);

    setTitle(activeEntry.title);
    setSelectedCollection(activeEntry.collection_id);
    setSelectedMood(mood);
  }

  function clearEntry() {
    setTitle("");
    setCover("");
    setSelectedMood("");
    setSelectedCollection("");
  }

  useEffect(() => {
    if (id) {
      async function handleGetEntry() {
        const data = await getEntryById(id);
        setActiveEntry(data);
        setInitialContent(data.content);
      }
      handleGetEntry();
    } else {
      setInitialContent(null);
      clearEntry();
    }
  }, [id]);

  useEffect(() => {
    if (activeEntry) {
      handleDisplayEntry();
    }
  }, [activeEntry]);

  useEffect(() => {
    console.log(editor?.document);
  }, [title]);

  if (editor === undefined) {
    return <Loader />;
  }

  return user === undefined ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      <Editor />

      {showCollectionSelector && (
        <div
          className="fixed inset-0 z-[1000]"
          onClick={() => setShowCollectionSelector(false)}
        />
      )}
      {showMoodSelector && (
        <div
          className="fixed inset-0 z-[1000]"
          onClick={() => setShowMoodSelector(false)}
        />
      )}
    </div>
  );
}

export default Write;
