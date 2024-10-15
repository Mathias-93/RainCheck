import React from "react";
import FutureForecastCard from "./FutureForecastCard";

export default function FutureForecast() {
  return (
    <>
      <h3 className="text-lg font-semibold">Next 7 days</h3>
      <div>
        <FutureForecastCard />
        <FutureForecastCard />
        <FutureForecastCard />
        <FutureForecastCard />
        <FutureForecastCard />
        <FutureForecastCard />
        <FutureForecastCard />
        <FutureForecastCard />
        <FutureForecastCard />
      </div>
    </>
  );
}
