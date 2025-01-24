import React, { useContext } from "react";
import { GlobalContext } from "../Context";
import WeatherCode from "./WeatherCode";

export default function WeatherPanel() {
  const { location, weatherData, handleDisplayWeatherImage, loading } =
    useContext(GlobalContext);

  const currentWeather = weatherData?.current;

  return (
    <div className="flex flex-col justify-between sm:w-[70%] md:w-[60%] p-2 text-slate-700 dark:text-gray-200 transition-colors duration-300">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-4">
          {loading ? (
            <p className="text-4xl font-semibold">Loading...</p>
          ) : (
            <p className="text-4xl sm:text-5xl lg:text-7xl font-semibold">
              {location ? location : "Please search for a location."}
            </p>
          )}
          <p className="text-2xl lg:text-4xl">
            {currentWeather?.temperature_2m !== undefined
              ? `${weatherData.current.temperature_2m} °C`
              : null}
          </p>
        </div>
        {weatherData && (
          <div className="min-w-[225px] md:w-[80%] flex items-center justify-center sm:justify-end ">
            {handleDisplayWeatherImage(currentWeather, "h-[225px]")}
          </div>
        )}
        <div className="flex flex-col gap-4">
          <WeatherCode currentWeatherCode={currentWeather?.weather_code} />
          <p className="text-lg lg:text-xl">
            {currentWeather?.apparent_temperature !== undefined
              ? `Feels like ${currentWeather.apparent_temperature}°C`
              : null}
          </p>
        </div>
      </div>
    </div>
  );
}
