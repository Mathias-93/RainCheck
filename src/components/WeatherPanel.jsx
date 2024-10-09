import React from "react";

export default function WeatherPanel(props) {
  const { location, weatherData } = props;
  const { current } = weatherData;
  const { temperature_2m, precipitation, apparent_temperature, is_day } =
    current;
  return (
    <div className="sm:ml-[20px] md:ml-[20px] lg:ml-[50px] xl:mt-[50px] mt-[20px] flex gap-16 text-slate-700 dark:text-gray-200 transition-colors duration-300">
      <div className="flex flex-col gap-[100px]">
        <div className="flex flex-col gap-4">
          <p className="text-4xl font-semibold">
            {location ? location : "No location available"}
          </p>
          <p className="text-2xl">
            {temperature_2m ? temperature_2m : "No data available"}
            °C
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p>Precipitation {precipitation ? precipitation + "mm" : "0mm"}</p>
          <p>
            Feels like{" "}
            {apparent_temperature ? apparent_temperature : "No data available"}
            °C
          </p>
        </div>
      </div>
      <div className="ml-[150px] sm:ml-[20px] xl:ml-[150px] mt-[50px]">
        {is_day === 1 ? (
          <i className="fa-solid fa-sun text-yellow-400 text-9xl"></i>
        ) : (
          <i className="fa-solid fa-moon text-slate-200 text-9xl"></i>
        )}
      </div>
    </div>
  );
}
