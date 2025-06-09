import CollectionsGrid from "../components/CollectionsGrid";
import CollectionsHeader from "../components/CollectionsHeader";
import Loader from "../components/Loader";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

function Collections() {
  const { user } = useAuth();

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
