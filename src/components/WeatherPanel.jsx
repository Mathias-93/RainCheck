import React from "react";
import PrecipitationInfo from "./PrecipitationInfo";

export default function WeatherPanel(props) {
  const { location, weatherData, handleDisplayWeatherImage } = props;

  const currentWeather = weatherData?.current;

  return (
    <div className="sm:ml-[20px] md:ml-[20px] lg:ml-[50px] xl:mt-[50px] mt-[20px] flex gap-16 text-slate-700 dark:text-gray-200 transition-colors duration-300">
      <div className="flex flex-col gap-[100px]">
        <div className="flex flex-col gap-4">
          <p className="text-4xl font-semibold">
            {location ? location : "No location available"}
          </p>
          <p className="text-2xl">
            {currentWeather?.temperature_2m !== undefined
              ? `${weatherData.current.temperature_2m} °C`
              : "No data available"}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <PrecipitationInfo weatherData={weatherData} />

          <p className="text-lg">
            Feels like{" "}
            {currentWeather?.apparent_temperature !== undefined
              ? currentWeather.apparent_temperature
              : "No data available"}
            °C
          </p>
        </div>
      </div>
      <div className="ml-[150px] sm:ml-[20px] xl:ml-[150px]">
        {handleDisplayWeatherImage(weatherData)}
      </div>
    </div>
  );
}

/* {currentWeather?.is_day === 1 ? (
  <i className="fa-solid fa-sun text-yellow-400 text-9xl"></i>
) : (
  
)} */
