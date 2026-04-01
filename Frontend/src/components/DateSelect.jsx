import React, { useState } from "react";
import BlurCircle from "./BlurCircle";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const onBookHandler = () => {
    if (!selected) {
      return toast("Please select a date");
    }
    navigate(`/movies/${id}/${selected}`);
    scrollTo(0, 0);
  };
  return (
    <div className="pt-16 sm:pt-24 md:pt-30" id="dateSelect">
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-10
          relative p-4 sm:p-6 md:p-8 bg-primary/10 border border-primary/20 rounded-lg"
      >
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />

        <div className="w-full">
          <p className="text-lg font-semibold">Choose Date</p>
          <div className="flex items-center gap-3 sm:gap-5 text-sm mt-5">
            <ChevronLeftIcon className="hidden sm:block" width={24} />
            <span className="grid grid-cols-4 sm:grid-cols-5 md:flex flex-wrap md:max-w-lg gap-2 sm:gap-3 w-full">
              {Object.keys(dateTime).map((date) => (
                <button
                  onClick={() => setSelected(date)}
                  className={`flex flex-col items-center justify-center h-12 w-12 sm:h-14 sm:w-14
                                          aspect-square rounded cursor-pointer ${selected === date ? "bg-primary text-white" : "border border-primary/70"}`}
                  key={date}
                >
                  <span>{new Date(date).getDate()}</span>
                  <span>
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>
                </button>
              ))}
            </span>
            <ChevronRightIcon className="hidden sm:block" width={24} />
          </div>
        </div>
        <button
          onClick={onBookHandler}
          className="bg-primary text-white px-8 py-2 mt-2 md:mt-6 rounded w-full md:w-auto
              hover:bg-primary/90 transition-all cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
