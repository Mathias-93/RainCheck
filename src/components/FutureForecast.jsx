import React, { useContext } from "react";
import FutureForecastCard from "./FutureForecastCard";
import { GlobalContext } from "../Context";

export default function FutureForecast() {
  const { weatherData, handleDisplayWeatherImage } = useContext(GlobalContext);

  return (
    <>
      <div className="flex items-center gap-3 p-2">
        <i className="fa-solid fa-calendar-days"></i>
        <h3 className="text-lg font-semibold flex pt-[2px]">7-day forecast</h3>
      </div>
      <div id="hello" className="w-full h-full flex flex-col gap-2 mt-10">
        {weatherData?.daily?.time.map((day, index) => {
          return (
            <FutureForecastCard
              key={index}
              date={day}
              tempMin={weatherData?.daily?.temperature_2m_min[index]}
              tempMax={weatherData?.daily?.temperature_2m_max[index]}
              icon={handleDisplayWeatherImage(
                weatherData?.daily?.weather_code[index],
                "h-[30px]",
                true
              )}
            />
          );
        })}
      </div>
    </>
  );
}
