import React from "react";

export default function WeatherCode({ currentWeatherCode }) {
  const getWeatherCode = (n) => {
    const weatherCodeMap = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Heavy drizzle",
      56: "Light freezing drizzle",
      57: "Heavy freezing drizzle",
      61: "Light rain",
      63: "Moderate rain",
      65: "Heavy rain",
      66: "Light freezing rain",
      67: "Heavy freezing rain",
      71: "Light snowfall",
      73: "Moderate snowfall",
      75: "Heavy snowfall",
      77: "Snow grains",
      80: "Light rain showers",
      81: "Moderate rain showers",
      82: "Heavy rain showers",
      85: "Light snow showers",
      86: "Heavy snow showers",
      95: "Light to moderate thunderstorm",
      96: "Light thunderstorm with hail",
      99: "Heavy thunderstorm with hail",
    };

    return weatherCodeMap[n] || "Unknown";
  };

  return <div>{getWeatherCode(currentWeatherCode)}</div>;
}
