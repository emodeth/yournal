import Editor from "@/components/Editor";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";
import { useEditor } from "../contexts/EditorContext";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getEntryById } from "../api/entries";
import { getMoodByMoodId } from "../lib/utils";
import { useMood } from "../contexts/MoodContext";
import { getCollectionById } from "../api/collections";
import DeleteModal from "../components/DeleteModal";

function Write() {
  const [loading, setLoading] = useState(null);
  const { user } = useAuth();
  const { allMoods } = useMood();
  const {
    editor,
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
    setSelectedMoodScore,
  } = useEditor();

  const { id } = useParams();

  async function handleDisplayEntry() {
    setLoading(true);
    const mood = await getMoodByMoodId(allMoods, activeEntry.mood_id);
    const collection = await getCollectionById(activeEntry.collection_id);
    setLoading(false);

    setTitle(activeEntry.title);
    setSelectedCollection(collection);
    setSelectedMood(mood);
    setSelectedMoodScore([activeEntry.entry_mood_score]);
    setCover(activeEntry.cover_image);
  }

  function clearEntry() {
    setTitle("");
    setCover("");
    setSelectedMood("");
    setSelectedMoodScore([5]);
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

  if (editor === undefined) {
    return <Loader />;
  }

  if (loading) {
    return <Loader />;
  }

  return user === undefined ? (
    <Loader />
  ) : (
    <>
      <div className="min-h-screen bg-white lg:flex hidden">
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

      <div className="lg:hidden flex min-h-screen bg-white flex items-center justify-center ">
        <p className="text-2xl">Mobile devices are not supported!</p>
      </div>
    </>
  );
}

export default Write;
