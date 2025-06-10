import { useEffect } from "react";
import CollectionsGrid from "../components/CollectionsGrid";
import CollectionsHeader from "../components/CollectionsHeader";
import Loader from "../components/Loader";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { getCollectionsByUserId } from "../api/collections";
import { useCollections } from "../contexts/CollectionsContext";

function Collections() {
  const { user } = useAuth();
  const { setCollections } = useCollections();

  useEffect(() => {
    async function handleGetCollections() {
      if (user?.id) {
        const data = await getCollectionsByUserId(user?.id);
        setCollections(data);
      }
    }

    handleGetCollections();
  }, [user]);

  return user === undefined ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-[#f9fafb]">
      <Navbar />
      <MaxWidthWrapper className={"py-8"}>
        <CollectionsHeader />
        <CollectionsGrid />
      </MaxWidthWrapper>
    </div>
  );
}

export default Collections;
