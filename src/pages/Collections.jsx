import CollectionsGrid from "../components/CollectionsGrid";
import CollectionsHeader from "../components/CollectionsHeader";
import Loader from "../components/Loader";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useCollections } from "../contexts/CollectionsContext";
import CollectionModal from "../components/CollectionModal";

function Collections() {
  const { user } = useAuth();
  const { isModalOpened } = useCollections();

  return user === undefined ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-[#f9fafb]">
      <Navbar />
      <MaxWidthWrapper className={"py-8"}>
        <CollectionsHeader />
        <CollectionsGrid />
        {isModalOpened && <CollectionModal />}
      </MaxWidthWrapper>
    </div>
  );
}

export default Collections;
