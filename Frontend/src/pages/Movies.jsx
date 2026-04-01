import React, { useState } from "react";
import MovieCard from "../components/MovieCard";
import BlurCircle from "../components/BlurCircle";
import { useAppContext } from "../context/AppContext";

const Movies = () => {
  const { shows } = useAppContext();
  const [selectedLanguage, setSelectedLanguage] = useState("hi");

  const indianLanguages = {
    hi: "Hindi",
    mr: "Marathi",
  };

  const filteredShows = shows.filter((show) => {
    return show.original_language === selectedLanguage;
  });

  return filteredShows.length > 0 ? (
    <div
      className="relative pt-28 md:pt-36 pb-20 md:pb-32 px-4 sm:px-6 md:px-16 lg:px-28 xl:px-36
           overflow-hidden min-h-[80vh]"
    >
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="50px" right="50px" />
      <h1 className="text-lg font-medium my-4">Now Showing</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(indianLanguages).map(([code, label]) => (
          <button
            key={code}
            onClick={() => setSelectedLanguage(code)}
            className={`px-4 py-2 rounded-full font-medium text-sm transition ${
              selectedLanguage === code
                ? "bg-primary text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredShows.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center">No movies available</h1>
    </div>
  );
};

export default Movies;
