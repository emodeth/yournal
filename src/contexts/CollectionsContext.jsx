import { createContext, useContext, useState } from "react";

const CollectionsContext = createContext();

export function CollectionsProvider({ children }) {
  const [collections, setCollections] = useState(null);
  const [activeCollection, setActiveCollection] = useState(null);

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        setCollections,
        activeCollection,
        setActiveCollection,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
}

export function useCollections() {
  const context = useContext(CollectionsContext);

  if (context) {
    return context;
  } else {
    throw new Error("use useCollections within CollectionsProvider context");
  }
}
