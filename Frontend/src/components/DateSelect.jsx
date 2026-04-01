import React, { useState, useRef } from "react";
import BlurCircle from "./BlurCircle";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -160 : 160, behavior: "smooth" });
  };

  const onBookHandler = () => {
    if (!selected) return toast("Please select a date");
    navigate(`/movies/${id}/${selected}`);
    scrollTo(0, 0);
  };

  return (
    <div className="pt-16 sm:pt-24 md:pt-30" id="dateSelect">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-4 sm:p-6 md:p-8 bg-primary/10 border border-primary/20 rounded-lg">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />

        <div className="w-full">
          <p className="text-lg font-semibold">Choose Date</p>
          <div className="flex items-center gap-2 mt-5">
            <button
              onClick={() => scroll("left")}
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded hover:bg-primary/10 transition-colors text-white/50 hover:text-white"
            >
              <ChevronLeftIcon width={20} />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-2 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {Object.keys(dateTime).map((date) => (
                <button
                  key={date}
                  onClick={() => setSelected(date)}
                  className={`shrink-0 flex flex-col items-center justify-center h-13 w-13 sm:h-14 sm:w-14 text-sm rounded cursor-pointer transition-colors
                    ${selected === date
                      ? "bg-primary text-white"
                      : "border border-primary/70 hover:border-primary"
                    }`}
                >
                  <span className="font-medium">{new Date(date).getDate()}</span>
                  <span className="text-xs opacity-80">
                    {new Date(date).toLocaleDateString("en-US", { month: "short" })}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => scroll("right")}
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded hover:bg-primary/10 transition-colors text-white/50 hover:text-white"
            >
              <ChevronRightIcon width={20} />
            </button>
          </div>
        </div>

        <button
          onClick={onBookHandler}
          className="bg-primary text-white px-8 py-2 mt-2 md:mt-6 rounded w-full md:w-auto hover:bg-primary/90 transition-all cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;