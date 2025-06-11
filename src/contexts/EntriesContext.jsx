import { createContext, useContext, useEffect, useState } from "react";
import { getEntriesByCollectionIds } from "../api/entries";
import { useCollections } from "./CollectionsContext";

const EntriesContext = createContext();

export function EntriesProvider({ children }) {
  const { collectionIds } = useCollections();
  const [entries, setEntries] = useState();

  async function handleGetEntries(collectionIds) {
    if (collectionIds) {
      const data = await getEntriesByCollectionIds(collectionIds);
      console.log(data);
      setEntries(data);
    }
  }

  useEffect(() => {
    handleGetEntries(collectionIds);
  }, [collectionIds]);

  return (
    <EntriesContext.Provider value={{ entries }}>
      {children}
    </EntriesContext.Provider>
  );
}

export function useEntries() {
  const context = useContext(EntriesContext);

  if (context) {
    return context;
  } else {
    throw new Error("use useEntries within EntriesProvider context");
  }
}
