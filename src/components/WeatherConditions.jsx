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
      sunrise.getHours().toString().padStart(2, "0"),
      sunrise.getMinutes().toString().padStart(2, "0"),
    ];
    const sunset = new Date(sunsetTime);
    const [sunsetHour, sunsetMinute] = [
      sunset.getHours().toString().padStart(2, "0"),
      sunset.getMinutes().toString().padStart(2, "0"),
    ];

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
        <h2 className="text-lg font-semibold dark:text-slate-200 lg:text-2xl">
          Weather Conditions
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-1">
        <WeatherConditionsCard
          id="precipitation"
          title={"Precipitation"}
          icon={"cloud-showers-heavy"}
        >
          {weatherData?.current?.precipitation >= 0 && (
            <h4 className="text-3xl font-semibold p-2 mt-4 lg:text-5xl">
              {weatherData?.current?.precipitation}{" "}
              {weatherData?.current_units.precipitation}
            </h4>
          )}
          <h4 className="text-sm p-2 lg:text-base">
            Probability {weatherData?.daily?.precipitation_probability_max[0]}%
          </h4>
        </WeatherConditionsCard>

        <WeatherConditionsCard id="wind" title={"Wind"} icon={"wind"}>
          <h4 className="text-3xl font-semibold p-2 mt-4 lg:p-3 lg:mt-5">
            {weatherData?.current?.wind_speed_10m}{" "}
            {weatherData?.current_units?.wind_speed_10m}
          </h4>
          <h4 className="text-sm p-2 lg:p-3">
            {weatherData?.current?.wind_direction_10m
              ? `From ${windDirection(
                  parseInt(weatherData.current.wind_direction_10m)
                )}`
              : "No data found"}
          </h4>
        </WeatherConditionsCard>

        <WeatherConditionsCard
          id="sunrise-sunset"
          title={"Sunrise & sunset"}
          icon={"sun"}
        >
          <div className="flex mt-2">
            <h3 className="text-lg font-semibold p-3 flex gap-2 items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <i className="fa-solid fa-chevron-up text-xs"></i>
                <i className="fa-regular fa-sun text-sm"></i>
              </div>{" "}
              <span className="text-sm lg:text-lg">
                {formattedSunriseTimeString}
              </span>
            </h3>
          </div>
          <hr className="bg-slate-500 h-[2px] lg:h-[1px] border-0" />
          <div className="flex">
            <h3 className="text-lg font-semibold p-3 flex gap-2 items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <i className="fa-solid fa-chevron-down text-xs"></i>
                <i className="fa-regular fa-sun text-sm"></i>
              </div>{" "}
              <span className="text-sm lg:text-lg">
                {formattedSunsetTimeString}
              </span>
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
            className="fa-regular fa-circle-question text-sm absolute right-3 top-3.5 cursor-pointer z-10"
          ></i>
          <h3 className="text-3xl font-semibold p-3 lg:p-4 lg:text-5xl">
            {weatherData?.hourly?.uv_index[0]}
          </h3>
          <div className="flex gap-2 items-center ml-2 lg:ml-3">
            <p className="text-sm lg:text-base">{uvIndexInfo.label}</p>
            <i
              className={`fa-solid fa-circle ${uvIndexInfo.color} text-sm lg:text-base`}
            ></i>
          </div>
          <p className="text-sm ml-2 lg:ml-3 lg:text-base">
            {uvIndexInfo.advice}
          </p>
        </WeatherConditionsCard>

        <WeatherConditionsCard
          id="humidity"
          title={"Humidity"}
          icon={"droplet"}
        >
          <div
            className="absolute bottom-0 left-0 w-full even-darker-blue 
             transition-all duration-500 opacity-60 
             dark:bg-gradient-to-t dark:from-[#010102] dark:via-[#1f1f1f] dark:to-[#292929] 
             dark:text-slate-100 text-gray-600 rounded-b-2xl rounded-t-sm 
             bg-[length:200%_200%] animate-gradient-y"
            style={{
              height: `${weatherData?.current?.relative_humidity_2m || 0}%`,
            }}
          ></div>

          <div className="z-10 flex w-full h-full p-3 mt-2 lg:mt-4">
            <h3 className="text-4xl font-semibold lg:text-5xl">
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
            className="fa-regular fa-circle-question text-sm absolute right-3 top-3.5 cursor-pointer z-10"
          ></i>
          <h3 className="text-3xl font-semibold p-3 lg:text-4xl lg:p-4">
            {weatherData?.hourly?.visibility[0] / 1000} km
          </h3>
          <p className="text-sm ml-3 lg:text-base lg:ml-5">
            {kilometersToMiles(weatherData?.hourly?.visibility[0] / 1000)} miles
          </p>
        </WeatherConditionsCard>
      </div>

      {/* Modal */}
      {showContent && <WeatherConditionsInfoModal ref={ref} />}
    </>
  );
}
