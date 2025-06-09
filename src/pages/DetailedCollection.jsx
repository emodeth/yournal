import { Link, useParams } from "react-router";

import MaxWidthWrapper from "../components/MaxWidthWrapper";
import Navbar from "../components/Navbar";
import { ArrowLeft, Calendar, Filter, Search } from "lucide-react";
import { useState } from "react";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/AuthContext";

function DetailedCollection() {
  const { id } = useParams();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [moodFilter, setMoodFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const collection = {
    name: "default koleksiyon",
    description: "default bir koleksiyonen",
  };

  function renderCollectionHeader() {
    return collection ? (
      <div className="mb-8">
        <Link
          to="/collections"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-500 mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back to Collections</span>
        </Link>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {collection.name}
            </h1>
            <p className="text-gray-600 mb-4">{collection.description}</p>
            <p className="text-sm text-gray-500">
              {5} {5 === 1 ? "entry" : "entries"}
            </p>
          </div>
        </div>
      </div>
    ) : (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Collection not found
          </h1>
          <Link
            to="/collections"
            className="text-blue-600 hover:text-blue-500 mt-4 inline-block"
          >
            ← Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  function renderSearch() {
    return (
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search entries..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }

  function renderDateFilter() {
    return (
      <div className="relative">
        <Calendar
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
    );
  }

  function renderMoodFilter() {
    return (
      <div className="relative">
        <Filter
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <select
          value={moodFilter}
          onChange={(e) => setMoodFilter(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
        >
          <option value="all">All Moods</option>
          <option value="5">😄 Very Happy</option>
          <option value="4">😊 Happy</option>
          <option value="3">😐 Neutral</option>
          <option value="2">😔 Sad</option>
          <option value="1">😞 Very Sad</option>
        </select>
      </div>
    );
  }

  function renderFilters() {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderSearch()}
          {renderMoodFilter()}
          {renderDateFilter()}
        </div>
      </div>
    );
  }

  return user === undefined ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-[#f9fafb]">
      <Navbar />
      <MaxWidthWrapper className={"py-8"}>
        {renderCollectionHeader()}
        {renderFilters()}
      </MaxWidthWrapper>
    </div>
  );
}

export default DetailedCollection;
