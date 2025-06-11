import { createContext, useContext, useEffect, useState } from "react";
import { getAllMoods } from "../api/moods";

const MoodContext = createContext();

export function MoodProvider({ children }) {
  const [allMoods, setAllMoods] = useState(null);

  async function handleGetAllMoods() {
    const data = await getAllMoods();
    setAllMoods(data);
  }

  useEffect(() => {
    handleGetAllMoods();
  }, []);

  return (
    <MoodContext.Provider value={{ allMoods }}>{children}</MoodContext.Provider>
  );
}

export function useMood() {
  const context = useContext(MoodContext);

  if (context) {
    return context;
  } else {
    throw new Error("use useMood within MoodProvider context");
  }
}
