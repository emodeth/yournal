import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";
import MaxWidthWrapper from "./MaxWidthWrapper";

function HomeHero() {
  return (
    <MaxWidthWrapper className={"text-center pb-16"}>
      <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-8">
        <Sparkles size={16} className="mr-2" />
        Be part of a movement for better mental health
      </div>

      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-none">
        Your Journey to
        <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent block">
          Better Mental Health
        </span>
      </h1>

      <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
        Track your emotions, discover patterns, and build lasting habits for
        improved well-being. Start your transformation today with our
        beautifully designed mood tracking platform.
      </p>

      <div className="flex items-center justify-center">
        <Link
          to="/login"
          className="px-8 py-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full hover:shadow-xl transition-all duration-200 font-semibold flex items-center"
        >
          Start Free Today
          <ArrowRight size={20} className="ml-2" />
        </Link>
      </div>
    </MaxWidthWrapper>
  );
}

export default HomeHero;
