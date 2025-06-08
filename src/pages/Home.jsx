import Navbar from "@/components/Navbar";
import HomeHero from "../components/HomeHero";
import HomeFeatures from "../components/HomeFeatures";
import HomeDivider from "../components/HomeDivider";
import HomeCTA from "../components/HomeCTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen pt-16">
        <HomeHero />
        <HomeDivider />
        <HomeFeatures />
        <HomeCTA />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
