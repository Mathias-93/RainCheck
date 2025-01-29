import React, { useContext } from "react";
import { GlobalContext } from "../Context";
import WeatherCode from "./WeatherCode";
import sun_sunglasses from "../assets/images/sun_sunglasses.png";

export default function WeatherPanel() {
  const { location, weatherData, handleDisplayWeatherImage, loading } =
    useContext(GlobalContext);

  const currentWeather = weatherData?.current;

  return (
    <div className="flex flex-col justify-between sm:w-[70%] md:w-[60%] p-2 text-slate-700 dark:text-gray-200 transition-colors duration-300">
      {loading ? (
        <img
          src={sun_sunglasses}
          alt="sun with sunglasses"
          className="w-[100px] 2xl:w-[350px] object-cover animate-spin"
        />
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-4 justify-center">
            <p className="text-2xl lg:text-4xl">
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
          <div className="flex flex-col gap-4">
            <WeatherCode currentWeatherCode={currentWeather?.weather_code} />
            <p className="text-lg lg:text-xl">
              {currentWeather?.apparent_temperature !== undefined
                ? `Feels like ${currentWeather.apparent_temperature}°C`
                : null}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
