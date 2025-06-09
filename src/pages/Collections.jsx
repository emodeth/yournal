import CollectionsGrid from "../components/CollectionsGrid";
import CollectionsHeader from "../components/CollectionsHeader";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import Navbar from "../components/Navbar";

function Collections() {
  return (
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
