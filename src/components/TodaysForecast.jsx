import React from "react";
import TodaysForecastCard from "./TodaysForecastCard";

export default function TodaysForecast(props) {
  const { weatherData, formatTime } = props;

  return (
    <>
      <div className="flex flex-col text-center">
        <h3 className="text-lg font-semibold">
          {formatTime(weatherData?.current?.time)}
        </h3>
      </div>
      <div className="flex gap-5">
        <TodaysForecastCard />
        <TodaysForecastCard />
        <TodaysForecastCard />
        <TodaysForecastCard />
        <TodaysForecastCard />
      </div>
    </>
  );
}
