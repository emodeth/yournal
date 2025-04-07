import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen pt-16">
        <MaxWidthWrapper>
          <h1>landing page</h1>
        </MaxWidthWrapper>
      </div>
    </div>
  );
}

export default Home;
