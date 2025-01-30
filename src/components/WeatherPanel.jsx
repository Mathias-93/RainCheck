import React, { useContext } from "react";
import { GlobalContext } from "../Context";
import WeatherCode from "./WeatherCode";
import sun_sunglasses from "../assets/images/sun_sunglasses.png";

export default function WeatherPanel() {
  const { location, weatherData, handleDisplayWeatherImage, loading } =
    useContext(GlobalContext);

  const currentWeather = weatherData?.current;

  return (
    <div className="flex flex-col relative justify-between 2xl:mt-10 sm:w-[70%] md:w-[60%] p-2 text-slate-700 dark:text-gray-200 transition-colors duration-300">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-4 justify-center">
          {weatherData && (
            <p className="text-4xl sm:text-5xl lg:text-7xl font-semibold dark:text-gray-200 text-white ">
              {location}
            </p>
          )}
          <p className="text-2xl lg:text-4xl text-white">
            {currentWeather?.temperature_2m !== undefined
              ? `${weatherData.current.temperature_2m} °C`
              : null}
          </p>
        </div>
        {weatherData && (
          <div className="min-w-[225px] md:w-[80%] 2xl:w-full flex items-center justify-center sm:justify-end">
            {handleDisplayWeatherImage(currentWeather, "h-[225px]")}
          </div>
        )}
        <div className="flex flex-col gap-4 text-white">
          <WeatherCode currentWeatherCode={currentWeather?.weather_code} />
          <p className="text-lg lg:text-xl text-white">
            {currentWeather?.apparent_temperature !== undefined
              ? `Feels like ${currentWeather.apparent_temperature}°C`
              : null}
          </p>
        </div>
      </div>
    </div>
  );
}
