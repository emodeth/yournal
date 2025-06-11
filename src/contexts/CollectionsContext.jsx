import { createContext, useContext, useEffect, useState } from "react";
import {
  createCollection,
  updateCollection,
  getCollectionsByUserId,
  deleteCollection,
} from "../api/collections";
import { useAuth } from "./AuthContext";

const CollectionsContext = createContext();

export function CollectionsProvider({ children }) {
  const { user } = useAuth();
  const [collections, setCollections] = useState(null);
  const [activeCollection, setActiveCollection] = useState(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);

  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");

  const [collectionIds, setCollectionIds] = useState(null);

  useEffect(() => {
    if (collections) {
      const ids = collections.map((collection) => collection.id);
      setCollectionIds(ids);
    }
  }, [collections]);

  async function handleGetCollections(userId) {
    if (userId) {
      const data = await getCollectionsByUserId(userId);
      setCollections(data);
    }
  }

  useEffect(() => {
    handleGetCollections(user?.id);
  }, [user]);

  function resetModal() {
    setEditingCollection(null);
    setCollectionName("");
    setCollectionDescription("");
  }

  function openModal() {
    resetModal();
    setIsModalOpened(true);
  }

  function handleEdit(collection) {
    setEditingCollection(collection);
    setCollectionName(collection.name);
    setCollectionDescription(collection.description);
    setIsModalOpened(true);
  }

  async function handleDelete(collectionId, userId) {
    await deleteCollection(collectionId);
    await handleGetCollections(userId);
  }

  async function handleSubmit(
    e,
    collectionId = "",
    userId,
    collectionName,
    collectionDescription
  ) {
    e.preventDefault();

    if (editingCollection !== null) {
      await updateCollection(
        collectionId,
        collectionName,
        collectionDescription
      );
    } else {
      await createCollection(userId, collectionName, collectionDescription);
    }
    await handleGetCollections(userId);
    setIsModalOpened(false);
    resetModal();
  }

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        setCollections,
        activeCollection,
        setActiveCollection,
        isModalOpened,
        setIsModalOpened,
        collectionName,
        setCollectionName,
        collectionDescription,
        setCollectionDescription,
        editingCollection,
        openModal,
        handleEdit,
        handleDelete,
        handleSubmit,
        collectionIds,
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
