import React, { useContext } from "react";
import { GlobalContext } from "../Context";
import WeatherCode from "./WeatherCode";

export default function WeatherPanel() {
  const { location, weatherData, handleDisplayWeatherImage } =
    useContext(GlobalContext);

  const currentWeather = weatherData?.current;

  return (
    <div className="flex justify-between mr-40 p-6 text-slate-700 dark:text-gray-200 transition-colors duration-300">
      <div className="flex flex-col gap-[100px]">
        <div className="flex flex-col gap-4">
          <p className="text-4xl font-semibold">
            {location ? location : "Please search for a location."}
          </p>
          <p className="text-2xl">
            {currentWeather?.temperature_2m !== undefined
              ? `${weatherData.current.temperature_2m} °C`
              : null}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <WeatherCode currentWeatherCode={currentWeather?.weather_code} />
          <p className="text-lg">
            {currentWeather?.apparent_temperature !== undefined
              ? `Feels like ${currentWeather.apparent_temperature}°C`
              : null}
          </p>
        </div>
      </div>
      {weatherData && (
        <div className="min-w-[225px]">
          {handleDisplayWeatherImage(currentWeather, "h-[225px]")}
        </div>
      )}
    </div>
  );
}
