import React, { useContext, useRef } from "react";
import { GlobalContext } from "../Context";
import "../index.css";
import WeatherConditionsCard from "./WeatherConditionsCard";
import WeatherConditionsInfoModal from "./WeatherConditionsInfoModal";
import useOutsideClick from "../utils/modal/Modal";
import { uvIndexLevels } from "../utils/data/data";
import { kilometersToMiles } from "../utils/helper-functions/helper";

export default function WeatherConditions() {
  const {
    weatherData,
    setShowContent,
    showContent,
    currentModal,
    setCurrentModal,
  } = useContext(GlobalContext);

  const ref = useRef();
  useOutsideClick(ref, () => setShowContent(false));

  const windDirection = (degrees) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"]; // Array of directions

    const directionIndex = Math.round(degrees / 45); // 8 directions, 360 / 8 = 45. We take the degrees and divide by 45 and round it to whole number. >
    // > This gives for example, 180 / 45 = 4 % 8 = 4. The value at index 4 is "S", which corresponds correctly to the given direction in degrees.

    return directions[directionIndex]; // Return the direction value at the position of the calculated index
  };

  const calculateUvIndex = (uvIndex) => {
    return uvIndexLevels.find(
      (uvObject) => uvIndex >= uvObject.min && uvIndex <= uvObject.max
    );
  };

  const uvIndexInfo = calculateUvIndex(
    Math.round(weatherData?.hourly?.uv_index[0])
  );

  const calculateSunriseSunset = (sunriseTime, sunsetTime) => {
    const sunrise = new Date(sunriseTime);
    const [sunriseHour, sunriseMinute] = [
      sunrise.getHours(),
      sunrise.getMinutes(),
    ];
    const sunset = new Date(sunsetTime);
    const [sunsetHour, sunsetMinute] = [sunset.getHours(), sunset.getMinutes()];

    const formattedSunriseTimeString = `Sunrise ${sunriseHour}:${sunriseMinute}`;
    const formattedSunsetTimeString = `Sunset ${sunsetHour}:${sunsetMinute}`;

    return [formattedSunriseTimeString, formattedSunsetTimeString];
  };

  const [formattedSunriseTimeString, formattedSunsetTimeString] =
    calculateSunriseSunset(
      weatherData?.daily?.sunrise[0],
      weatherData?.daily?.sunset[0]
    );

  return (
    <>
      <div className="flex flex-col text-center">
        <h3 className="text-lg font-semibold">Weather Conditions</h3>
      </div>

      <div className="grid grid-cols-2 gap-8 p-4">
        <WeatherConditionsCard
          id="precipitation"
          title={"Precipitation"}
          icon={"cloud-showers-heavy"}
        >
          {weatherData?.current?.precipitation >= 0 && (
            <h1 className="text-5xl font-semibold p-3">
              {weatherData?.current?.precipitation}{" "}
              {weatherData?.current_units.precipitation}
            </h1>
          )}
          <h3 className="text-lg font-semibold p-3">
            Probability {weatherData?.daily?.precipitation_probability_max[0]}%
          </h3>
        </WeatherConditionsCard>

        <WeatherConditionsCard id="wind" title={"Wind"} icon={"wind"}>
          <h1 className="text-5xl font-semibold p-3">
            {weatherData?.current?.wind_speed_10m}{" "}
            {weatherData?.current_units?.wind_speed_10m}
          </h1>
          <h3 className="text-lg font-semibold p-3">
            {weatherData?.current?.wind_direction_10m
              ? `From ${windDirection(
                  parseInt(weatherData.current.wind_direction_10m)
                )}`
              : "No data found"}
          </h3>
        </WeatherConditionsCard>

        <WeatherConditionsCard
          id="sunrise-sunset"
          title={"Sunrise & sunset"}
          icon={"sun"}
        >
          <div className="flex">
            <h3 className="text-lg font-semibold p-3 flex gap-2 items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <i className="fa-solid fa-chevron-up text-sm"></i>
                <i className="fa-regular fa-sun"></i>
              </div>{" "}
              {formattedSunriseTimeString}
            </h3>
          </div>
          <hr className="bg-slate-500 h-[2px] border-0" />
          <div className="flex">
            <h3 className="text-lg font-semibold p-3 flex gap-2 items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <i className="fa-solid fa-chevron-down text-sm"></i>
                <i className="fa-regular fa-sun"></i>
              </div>{" "}
              {formattedSunsetTimeString}
            </h3>
          </div>
        </WeatherConditionsCard>

        <WeatherConditionsCard
          id="uv-index"
          title={"UV index"}
          icon={"cloud-sun"}
        >
          <i
            onClick={() => {
              setShowContent(true);
              setCurrentModal("uv");
            }}
            className="fa-regular fa-circle-question z-10 absolute right-6 top-6 cursor-pointer"
          ></i>
          <h3 className="text-5xl font-semibold p-3">
            {weatherData?.hourly?.uv_index[0]}
          </h3>
          <div className="flex gap-2 items-center">
            <p className="font-semibold">{uvIndexInfo.label}</p>
            <i className={`fa-solid fa-circle ${uvIndexInfo.color}`}></i>
          </div>
          <p className="font-semibold">{uvIndexInfo.advice}</p>
        </WeatherConditionsCard>

        <WeatherConditionsCard
          id="humidity"
          title={"Relative humidity"}
          icon={"droplet"}
        >
          <div
            className="absolute bottom-0 left-0 w-full bg-sky-300 transition-all duration-500 opacity-60 dark:bg-slate-400 dark:text-slate-100 text-gray-600 rounded-b-2xl rounded-t-md"
            style={{
              height: `${weatherData?.current?.relative_humidity_2m || 0}%`,
            }}
          ></div>

          <div className="z-10 flex w-full h-full p-3 ml-5">
            <h3 className="text-5xl font-semibold">
              {weatherData?.current?.relative_humidity_2m
                ? `${weatherData.current.relative_humidity_2m}%`
                : "No data found"}
            </h3>
          </div>
        </WeatherConditionsCard>

        <WeatherConditionsCard
          id="visibility"
          icon={"eye"}
          title={"Visibility"}
        >
          <i
            onClick={() => {
              setShowContent(true);
              setCurrentModal("visibility");
            }}
            className="fa-regular fa-circle-question absolute right-6 top-6 cursor-pointer z-10"
          ></i>
          <h3 className="text-5xl font-semibold p-3">
            {weatherData?.hourly?.visibility[0] / 1000} km
          </h3>
          <p className="font-semibold pl-5">
            {kilometersToMiles(weatherData?.hourly?.visibility[0] / 1000)} miles
          </p>
        </WeatherConditionsCard>
      </div>

      {/* Modal */}
      {showContent && <WeatherConditionsInfoModal ref={ref} />}
    </>
  );
}
