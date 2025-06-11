import CollectionsGrid from "../components/CollectionsGrid";
import CollectionsHeader from "../components/CollectionsHeader";
import Loader from "../components/Loader";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useCollections } from "../contexts/CollectionsContext";
import CollectionModal from "../components/CollectionModal";
import DeleteModal from "../components/DeleteModal";
import { useState } from "react";

function Collections() {
  const { user } = useAuth();
  const { isModalOpened, handleDelete } = useCollections();

  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  function _handleDelete() {
    handleDelete(deleteItemId, user?.id);
    setIsDeleteModalOpened(false);
  }

  function handleSkip() {
    setIsDeleteModalOpened(false);
  }

  return user === undefined ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-[#f9fafb]">
      <Navbar />
      <MaxWidthWrapper className={"py-8"}>
        <CollectionsHeader />
        <CollectionsGrid
          setDeleteItemId={setDeleteItemId}
          setIsDeleteModalOpened={setIsDeleteModalOpened}
        />
        {isModalOpened && <CollectionModal />}
        {isDeleteModalOpened && (
          <DeleteModal
            setIsModalOpened={setIsDeleteModalOpened}
            handleSkip={handleSkip}
            handleSuccess={_handleDelete}
          />
        )}
      </MaxWidthWrapper>
    </div>
  );
}

export default Collections;
