import Navbar from "@/components/Navbar";
import HomeHero from "../components/HomeHero";
import HomeFeatures from "../components/HomeFeatures";
import HomeDivider from "../components/HomeDivider";
import HomeCTA from "../components/HomeCTA";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";

function Home() {
  const { user } = useAuth();

  return user === undefined ? (
    <Loader />
  ) : (
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
