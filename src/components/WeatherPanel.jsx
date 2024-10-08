import React from "react";

export default function WeatherPanel(props) {
  const { location, weatherData } = props;
  return (
    <div className="ml-[100px] mt-[20px] flex gap-16 text-slate-700 dark:text-gray-200 transition-colors duration-300">
      <div className="flex flex-col gap-[100px]">
        <div className="flex flex-col gap-4">
          <p>Location: {location ? location : "No location available"}</p>
          <p>Temperature: {weatherData.current.temperature_2m}°C</p>
        </div>
        <div className="flex flex-col gap-4">
          <p>Precipitation: {weatherData.current.precipitation}mm</p>
          <p>
            Apparent Temperature: {weatherData.current.apparent_temperature}°C
          </p>
        </div>
      </div>
      <div>
        <p>some way to indicate day/night</p>
      </div>
      <div>ICON</div>
    </div>
  );
}
