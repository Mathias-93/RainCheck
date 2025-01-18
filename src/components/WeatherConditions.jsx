import React, { useContext } from "react";
import { GlobalContext } from "../Context";
import "../index.css";

export default function WeatherConditions() {
  const { weatherData } = useContext(GlobalContext);

  const windDirection = (degrees) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"]; // Array of directions

    const directionIndex = Math.round(degrees / 45); // 8 directions, 360 / 8 = 45. We take the degrees and divide by 45 and round it to whole number. >
    // > This gives for example, 180 / 45 = 4 % 8 = 4. The value at index 4 is "S", which corresponds correctly to the given direction in degrees.

    return directions[directionIndex]; // Return the direction value at the position of the calculated index
  };

  return (
    <>
      <div className="flex flex-col text-center">
        <h3 className="text-lg font-semibold">Weather Conditions</h3>
      </div>

      <div className="grid grid-cols-2 gap-8 p-4">
        <div
          id="precipitation-container"
          className="flex items-center justify-center w-[350px] h-[200px] bg-sky-200 rounded-2xl "
        >
          {/* Current precipitation, precipitation probability */}
          {}
        </div>
        <div
          id="wind-container"
          className="flex flex-col p-4 items-center justify-center w-[350px] h-[200px] bg-sky-200 rounded-2xl "
        >
          <div className="flex gap-2 w-full h-[20%]">
            <h3 className="text-2xl font-semibold flex items-center">Wind</h3>
            <i className="fa-solid fa-wind flex items-center text-2xl"></i>
          </div>

          <div className="flex flex-col justify-between w-full h-full">
            <h1 className="text-5xl font-semibold p-3">8 m/s</h1>
            <h3 className="text-lg font-semibold p-3">
              {weatherData?.current?.wind_direction_10m
                ? `From ${windDirection(
                    parseInt(weatherData.current.wind_direction_10m)
                  )}`
                : "No data found"}
            </h3>
          </div>
        </div>

        <div
          id="sunrise-sunset-container"
          className="flex items-center justify-center w-[350px] h-[200px] bg-sky-200 rounded-2xl "
        >
          {/* Sunrise and sunset times for today */}asd
        </div>

        <div
          id="uv-index-container"
          className="flex items-center justify-center w-[350px] h-[200px] bg-sky-200 rounded-2xl "
        >
          {/* Current UV index by number and whether it's high or low */}asd
        </div>

        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}

        <div
          id="humidity-container"
          className="relative flex flex-col items-center gap-2 p-3 w-[350px] h-[200px] bg-sky-200 rounded-2xl overflow-hidden"
        >
          <div
            className="absolute bottom-0 left-0 w-full bg-sky-300 transition-all duration-500 opacity-60 wavy-top"
            style={{
              height: `${weatherData?.current?.relative_humidity_2m || 0}%`,
            }}
          ></div>

          {/* Text stays above the waves */}
          <div className="z-10 flex gap-2 w-full h-[20%] p-3">
            <h3 className="text-2xl font-semibold flex items-center">
              Relative Humidity
            </h3>
            <i className="fa-solid fa-droplet flex items-center text-2xl"></i>
          </div>

          <div className="z-10 flex w-full h-full p-3 ml-5">
            <h3 className="text-5xl font-semibold">
              {weatherData?.current?.relative_humidity_2m
                ? `${weatherData.current.relative_humidity_2m}%`
                : "No data found"}
            </h3>
          </div>
        </div>

        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}

        <div
          id="visibility-container"
          className="flex items-center justify-center w-[350px] h-[200px] bg-sky-200 rounded-2xl "
        >
          {/* Find some way of representing visibility */}asd
        </div>
      </div>
    </>
  );
}
