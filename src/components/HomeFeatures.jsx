import { Heart, BarChart3, Shield, Sparkles } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const features = [
  {
    icon: Heart,
    title: "Emotional Intelligence",
    description:
      "Build deeper self-awareness through daily mood tracking and reflection.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description:
      "Discover patterns and trends in your emotional well-being with beautiful visualizations.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Complete Privacy",
    description:
      "Your thoughts stay yours. All data is stored locally and never shared.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Sparkles,
    title: "Personalized Experience",
    description:
      "Customize collections, templates, and insights that work for your unique journey.",
    color: "from-purple-500 to-violet-500",
  },
];

function HomeFeatures() {
  function renderFeatureCard(feature, index) {
    return (
      <div
        key={index}
        className="group p-8 bg-blue-50 rounded-2xl border border-gray-200 shadow-sm transition-all duration-300"
      >
        <div
          className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
        >
          <feature.icon className="text-white" size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {feature.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
      </div>
    );
  }

  return (
    <MaxWidthWrapper className={"py-32"}>
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Everything you need for
          <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent">
            {" "}
            emotional wellness
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Powerful features designed to help you understand your emotions, track
          progress, and build healthier mental habits.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => renderFeatureCard(feature, index))}
      </div>
    </MaxWidthWrapper>
  );
}

export default HomeFeatures;
