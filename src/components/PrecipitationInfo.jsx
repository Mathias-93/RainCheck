import React from "react";

export default function PrecipitationInfo(props) {
  const { weatherData } = props;

  const precipitationAmount = parseFloat(weatherData?.current?.precipitation);
  const rainAmount = parseFloat(weatherData?.current?.rain);
  const snowAmount = parseFloat(weatherData?.current?.snowfall);

  let precipitationType;
  let icon;

  if (rainAmount > 0) {
    precipitationType = "rain";
    icon = <i className="fa-solid fa-cloud-rain"></i>;
  } else if (snowAmount > 0) {
    precipitationType = "Snow";
    icon = <i className="fa-regular fa-snowflake"></i>;
  } else {
    precipitationType = "No precipitation";
    icon = <i className="fa-solid fa-cloud"></i>;
  }

  return (
    <p className="flex items-center gap-2 text-lg">
      {precipitationAmount > 0
        ? `${precipitationAmount}mm ${precipitationType}`
        : "No precipitation"}
      {icon}
    </p>
  );
}
