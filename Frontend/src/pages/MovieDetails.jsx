import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlurCircle from "../components/BlurCircle";
import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
import timeFormat from "../lib/timeFormat";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MovieDetails = () => {
  const {
    shows,
    axios,
    getToken,
    user,
    fetchFavoriteMovies,
    favoriteMovies,
    image_base_url,
  } = useAppContext();
  const navigate = useNavigate();

  const { id } = useParams();
  const [show, setShow] = useState(null);
  const movie = show?.movie;

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);
      if (data.success && data.movie) {
        setShow(data);
      } else {
        setShow(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFavorite = async () => {
    try {
      if (!user) {
        return toast.error("Please login to proceed");
      }

      const { data } = await axios.post(
        "/api/user/update-favorite",
        { movieId: id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );

      if (data.success) {
        await fetchFavoriteMovies();
        toast.success(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getShow();
  }, [id]);

  return show && movie ? (
    <div className="px-4 sm:px-6 md:px-16 lg:px-24 pt-26 sm:pt-30 md:pt-40">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          className="mx-auto md:mx-0 rounded-xl w-full max-w-xs sm:max-w-sm md:max-w-[18rem] h-auto md:h-104 object-cover"
          src={image_base_url + movie.poster_path}
          alt=""
        />

        <div className="relative flex flex-col gap-3">
          <BlurCircle top="100px" left="100px" />
          <p className="text-primary">ENGLISH</p>
          <h1 className="text-3xl sm:text-4xl font-semibold max-w-2xl text-balance">
            {movie.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {movie.vote_average.toFixed(1)} User Ratings
          </div>
          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {movie.overview}
          </p>
          <p>
            {timeFormat(movie.runtime)} •{" "}
            {movie.genres.map((genre) => genre.name).join(", ")} •{" "}
            {movie.release_date.split("-")[0]}
          </p>

          <div className="flex items-center flex-wrap gap-3 sm:gap-4 mt-4">
            <button
              className="flex items-center gap-2 px-7 p-3 text-sm
                          bg-gray-800 hover:bg-gray-900 transition rounded-md
                                        font-medium cursor-pointer active:scale-95 w-full sm:w-auto justify-center"
            >
              <PlayCircleIcon className="w-5 h-5" />
              Watch Trailer
            </button>
            <a
              className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull
                                     transition rounded-md font-medium cursor-pointer active:scale-95 w-full sm:w-auto text-center"
              href="#dateSelect"
            >
              Buy Tickets
            </a>
            <button
              onClick={handleFavorite}
              aria-label="Toggle favorite"
              aria-pressed={!!favoriteMovies.find((movie) => movie._id === id)}
              className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95"
            >
              <Heart
                className={`w-5 h-5 ${
                  favoriteMovies.find((movie) => movie._id === id)
                    ? "fill-primary text-primary"
                    : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <p className="text-lg font-medium mt-14 sm:mt-20">Your Favorite Cast</p>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-4 w-max px-1 sm:px-4">
          {(movie.casts || []).slice(0, 12).map((cast, index) => (
            <div className="flex flex-col items-center text-center" key={index}>
              <img
                className="rounded-full h-20 md:h-20 aspect-square object-cover"
                src={image_base_url + cast.profile_path}
                alt="cast-img"
              />

              <p className="font-medium text-xs mt-3">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id} />

      <p className="text-lg font-medium mt-14 sm:mt-20 mb-6 sm:mb-8">
        You May Also Like
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {shows.slice(0, 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center mt-12 sm:mt-20">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull
                       transition rounded-md font-medium cursor-pointer"
        >
          Show More
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
