import React, { useContext } from "react";
import { GlobalContext } from "../Context";

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
      <div className="flex gap-8">
        <div>
          <div className="flex gap-2 items-center ">
            <h3 className="text-lg font-semibold">Windspeed</h3>
            <i className="fa-solid fa-wind"></i>
          </div>
          <p>
            {weatherData?.current?.wind_speed_10m
              ? `${weatherData.current.wind_speed_10m} m/s`
              : "No data found"}
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-center ">
            <h3 className="text-lg font-semibold">Relative Humidity</h3>
            <i className="fa-solid fa-droplet"></i>
          </div>
          <p>
            {weatherData?.current?.relative_humidity_2m
              ? `${weatherData.current.relative_humidity_2m}%`
              : "No data found"}
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-center ">
            <h3 className="text-lg font-semibold">Rainfall</h3>
            <i className="fa-solid fa-cloud-showers-heavy"></i>
          </div>
          <p>
            {weatherData?.current?.rain
              ? `${weatherData.current.rain}mm`
              : "No rain right now!"}
          </p>
        </div>
        <div>
          <p>Time</p>
          <p>Icon rep weather</p>
          <p>Temp</p>
        </div>
      </div>
      <div className="flex gap-8">
        <div>
          <div className="flex gap-2 items-center ">
            <h3 className="text-lg font-semibold">Wind Direction</h3>
            <i className="fa-solid fa-wind"></i>
          </div>
          <p>
            {weatherData?.current?.wind_direction_10m
              ? `${windDirection(
                  parseInt(weatherData.current.wind_direction_10m)
                )}`
              : "No data found"}
          </p>
        </div>
        <div>
          <p>Time</p>
          <p>Icon rep weather</p>
          <p>Temp</p>
        </div>
        <div>
          <p>Time</p>
          <p>Icon rep weather</p>
          <p>Temp</p>
        </div>
        <div>
          <p>asd</p>
          <p>Icon rep weather</p>
          <p>Temp</p>
        </div>
      </div>
    </>
  );
}
