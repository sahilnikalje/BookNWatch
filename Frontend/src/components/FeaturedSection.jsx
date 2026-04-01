import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import MovieCard from "./MovieCard";
import { useAppContext } from "../context/AppContext";

const FeaturedSection = () => {
  const { shows } = useAppContext();
  const navigate = useNavigate();
  return (
    <div className="px-4 sm:px-6 md:px-16 lg:px-24 xl:px-36 overflow-hidden">
      {/* //todo movie title */}
      <div className="relative flex items-center justify-between pt-14 sm:pt-18 pb-8">
        <BlurCircle top="0" right="-80px" />
        <p className="text-gray-300 font-medium text-lg">Now Showing</p>
        <button
          onClick={() => navigate("/movies")}
          className="group flex-colx items-center gap-2 text-sm text-gray-300 cursor-pointer"
        >
          View All
          <ArrowRightIcon className="group-hover:translate-x-0.5 transition w-4.5 h-4.5" />
        </button>
      </div>

      {/* //todo movie card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-6">
        {shows.slice(0, 3).map((show) => (
          <MovieCard key={show._id} movie={show} />
        ))}
      </div>

      {/* //todo button */}
      <div className="flex justify-center mt-12 sm:mt-16">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default FeaturedSection;
