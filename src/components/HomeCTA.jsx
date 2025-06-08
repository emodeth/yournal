import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

function HomeCTA() {
  return (
    <div className="py-24 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to transform your mental health?
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Join thousands of users who have already started their journey to
          better emotional well-being.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="flex items-center justify-center">
            <Link
              to="/login"
              className="px-8 py-4 bg-white text-blue-500 rounded-full hover:shadow-xl transition-all duration-200 font-semibold flex items-center"
            >
              Start Free Today
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
        <p className="text-blue-100 text-sm mt-6">
          Free forever • No credit card required • 2 minutes to set up
        </p>
      </div>
    </div>
  );
}

export default HomeCTA;
