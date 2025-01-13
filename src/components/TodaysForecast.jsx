import React, { useContext, useRef } from "react";
import { GlobalContext } from "../Context";

export default function TodaysForecast(props) {
  const { formatDate } = props;
  const { weatherData, handleDisplayWeatherImage } = useContext(GlobalContext);
  const scrollRef = useRef(null); // useRef let's you hold a reference to a DOM element or a mutable value across renders, without causing re-renders when updated

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -150,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 150,
      behavior: "smooth",
    });
  };

  const formatDailyData = () => {
    const maxHours = 24;
    const currentTime = new Date();
    const minHours = currentTime.getHours() + 1;
    const formattedTime = weatherData?.hourly?.time
      .slice(minHours, maxHours)
      .map((time, index) => ({
        hour: new Date(time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        temp: weatherData?.hourly?.temperature_2m[index],
      }));

    return (
      <div className="flex">
        {formattedTime?.map((item, index) => {
          return (
            <div key={index} className="flex flex-col w-[90px] gap-2">
              <p className="w-[20px]">{`${item.hour}`}</p>
              <div>{handleDisplayWeatherImage(weatherData, "h-[30px]")}</div>
              <p>{`${item.temp}°`}</p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center">
        <h3 className="text-lg font-semibold">
          Hourly {formatDate(weatherData?.current?.time)}
        </h3>
      </div>
      <div className="flex gap-2">
        <button
          onClick={scrollLeft}
          className="w-[15%] rounded-md bg-sky-300 hover:bg-opacity-75 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          <i className="fa-solid fa-caret-left text-3xl text-gray-600 dark:text-slate-300" />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-1 pb-2 p-1 overflow-x-auto overflow-y-hidden scrollbar-none"
        >
          {formatDailyData()}
        </div>
        <button
          onClick={scrollRight}
          className="w-[15%] rounded-md bg-sky-300 hover:bg-opacity-75 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          <i className="fa-solid fa-caret-right text-3xl text-gray-600 dark:text-slate-300 " />
        </button>
      </div>
    </div>
  );
}
