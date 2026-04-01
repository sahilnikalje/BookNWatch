import React, { useState } from "react";
import { dummyTrailers } from "../assets/assets";
import ReactPlayer from "react-player";
import BlurCircle from "./BlurCircle";
import { PlayCircleIcon } from "lucide-react";
const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  //! for ifrae convert yt url to embed url
  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };
  return (
    <div className="px-4 sm:px-6 md:px-16 lg:px-24 xl:px-36 py-14 sm:py-20 overflow-hidden">
      <p className="text-gray-300 font-medium text-lg max-w-[960px]">
        Trailers
      </p>

      <div className="relative mt-6">
        <BlurCircle top="-100px" right="-100px" />

        {/* //! reactplayer giving errors so ise iframe */}
        {/* <ReactPlayer 
              className='mx-auto max-w-full'
            //   width="960px" height="540px"
              width="100%" height="100%"
              style={{ maxWidth: '960px', maxHeight: '540px' }}
              url={currentTrailer.videoUrl} 
              controls={false}
            /> */}
        <div className="relative w-full max-w-[960px] mx-auto aspect-video rounded-xl overflow-hidden border border-white/10">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={getEmbedUrl(currentTrailer.videoUrl)}
            allowFullScreen
          />
        </div>
      </div>

      {/* //todo show multiple images to show trailers */}
      <div className="group grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 md:gap-8 mt-6 sm:mt-8 max-w-3xl mx-auto">
        {dummyTrailers.map((trailer) => (
          <div
            onClick={() => setCurrentTrailer(trailer)}
            key={trailer.image}
            className="relative aspect-video
                     group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300
                     transition cursor-pointer
                 "
          >
            <img
              className="rounded-lg w-full h-full object-cover brightness-75"
              src={trailer.image}
              alt="trailer_image"
            />
            <PlayCircleIcon
              className="absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:h-12 transform
                                -translate-x-1/2 -translate-y-1/2"
              strokeWidth={1.6}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailerSection;
