import React, { useContext } from "react";
import { GlobalContext } from "../Context";

export default function FutureForecastCard({}) {
  const { weatherData } = useContext(GlobalContext);

  if (weatherData) {
    const dailyData = weatherData.daily;
  }

  return (
    <div>
      <p>Hello World</p>
    </div>
  );
}
