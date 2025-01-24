import React, { useContext, useRef } from "react";
import { GlobalContext } from "../Context";

export default function TodaysForecast(props) {
  const { formatDate } = props;
  const { weatherData, handleDisplayWeatherImage } = useContext(GlobalContext);
  const scrollRef = useRef(null); // useRef let's you hold a reference to a DOM element or a mutable value across renders, without causing re-renders when updated

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -105,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 105,
      behavior: "smooth",
    });
  };

  const formatDailyData = () => {
    const formattedTime = weatherData?.hourly?.time.map((time, index) => {
      const localTime = new Date(time);
      const localHour = localTime.getHours(); // Get local hour as a number
      const sunriseHour = new Date(weatherData?.daily?.sunrise[0]).getHours();
      const sunsetHour = new Date(weatherData?.daily?.sunset[0]).getHours() + 1;

      const isDayCorrected =
        localHour >= sunriseHour && localHour < sunsetHour ? 1 : 0;

      return {
        hour: localTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        temp: weatherData?.hourly?.temperature_2m[index],
        weather_code: weatherData?.hourly?.weather_code[index],
        cloud_cover: weatherData?.hourly?.cloud_cover[index],
        rain: weatherData?.hourly?.rain[index],
        is_day: isDayCorrected, // Use the manually corrected is_day
      };
    });

    return (
      <div className="flex">
        {(() => {
          if (!formattedTime || formattedTime.length === 0) return null; // Handle empty data case

          // Get the current local hour
          const currentHour = new Date().getHours();

          // Find the closest matching hour in the dataset
          const startIndex = formattedTime.findIndex(
            (item) => parseInt(item.hour) === currentHour
          );

          // If no exact match is found, default to index 0
          const safeStartIndex = startIndex !== -1 ? startIndex : 0;

          // Ensure we only slice within available data boundaries
          const firstPart = formattedTime.slice(
            safeStartIndex,
            safeStartIndex + 24
          );

          // If we reach the end of the array, take remaining hours from the next day
          const remainingHoursNeeded = 24 - firstPart.length;
          const secondPart =
            remainingHoursNeeded > 0
              ? formattedTime.slice(0, remainingHoursNeeded)
              : [];

          // Merge both parts to always get exactly 24 hours
          const next24Hours = [...firstPart, ...secondPart];

          return next24Hours.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-center w-14 gap-1 lg:gap-3 lg:w-16 2xl:w-20"
            >
              <p className="text-xs sm:text-sm md:text-base lg:text-xl">{`${item.hour}`}</p>
              <div>{handleDisplayWeatherImage(item, "h-[30px]")}</div>
              <p className="text-xs sm:text-sm md:text-base lg:text-xl">{`${item.temp}°`}</p>
            </div>
          ));
        })()}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center items-center">
        <h3 className="text-xs sm:text-base md:text-lg lg:text-2xl font-semibold">
          Hourly {formatDate(weatherData?.current?.time)}
        </h3>
      </div>
      <div className="flex justify-between">
        <div className="min-w-[15px] sm:min-w-[20px] md:min-w-[25px] lg:min-w-[35px] flex justify-center rounded-md bg-sky-300 hover:bg-opacity-75 dark:bg-slate-700 dark:hover:bg-slate-600">
          <button
            onClick={scrollLeft}
            className="w-full rounded-md bg-sky-300 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            <i className="fa-solid fa-caret-left text-lg text-gray-600 dark:text-slate-300" />
          </button>
        </div>
        <div
          ref={scrollRef}
          className="flex p-1 lg:h-full overflow-y-hidden scrollbar-none w-full"
        >
          {formatDailyData()}
        </div>
        <div className="min-w-[15px] sm:min-w-[20px] md:min-w-[25px] lg:min-w-[35px] flex justify-center rounded-md bg-sky-300 hover:bg-opacity-75 dark:bg-slate-700 dark:hover:bg-slate-600">
          <button
            onClick={scrollRight}
            className="w-full rounded-md bg-sky-300 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            <i className="fa-solid fa-caret-right text-lg text-gray-600 dark:text-slate-300 " />
          </button>
        </div>
      </div>
    </div>
  );
}
