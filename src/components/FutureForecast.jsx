import React, { useContext } from "react";
import FutureForecastCard from "./FutureForecastCard";
import { GlobalContext } from "../Context";

export default function FutureForecast() {
  const { weatherData } = useContext(GlobalContext);

  const dailyData = weatherData?.daily;

  return (
    <>
      <div className="flex items-center gap-3">
        <i className="fa-solid fa-calendar-days"></i>
        <h3 className="text-lg font-semibold flex pt-[2px]">7-day forecast</h3>
      </div>

      <div>
        {dailyData.temperature_2m_max.map((temp, index) => {
          return <p key={index}>{temp}</p>;
        })}
      </div>
    </>
  );
}
