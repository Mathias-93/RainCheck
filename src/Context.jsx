import { createContext, useState } from "react";
import sunAndCloud from "./assets/images/sunAndCloud.png";
import sunny from "./assets/images/sunny.png";
import Clouds from "./assets/images/Clouds.png";
import Moon from "./assets/images/moon-phase.png";
import cloudyNight from "./assets/images/cloudyNight.png";
import snow from "./assets/images/snow.png";
import rainy from "./assets/images/rainy.png";
import mist from "./assets/images/mist.png";
import Thunderstorm from "./assets/images/Thunderstorm.png";
import rainy_night from "./assets/images/rainy_night.png";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [location, setLocation] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [isFrontPage, setIsFrontPage] = useState(true);
  const [error, setError] = useState(null);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  const getWeatherConditionKey = (weatherData, isFuture = false) => {
    if (!weatherData) return "sunny";

    const { weather_code, is_day, cloud_cover } = weatherData;

    // If this is a future forecast, we don't have is_day or cloud_cover
    if (isFuture) {
      if ([95, 96, 99].includes(weather_code)) return "thunderstorm";
      if ([51, 53, 55, 61, 63, 65, 66, 67, 80, 81, 82].includes(weather_code))
        return "rainy";
      if ([71, 73, 75, 77, 85, 86].includes(weather_code)) return "snowy";
      if ([45, 48].includes(weather_code)) return "mist";
      if ([2, 3].includes(weather_code)) return "cloudy";
      if ([1].includes(weather_code)) return "partlyCloudy";
      return "sunny"; // Default
    }

    if ([95, 96, 99].includes(weather_code)) return "thunderstorm";
    if (
      [51, 53, 55, 61, 63, 65, 66, 67, 80, 81, 82].includes(weather_code) &&
      !is_day
    )
      return "rainy_night";
    if ([51, 53, 55, 61, 63, 65, 66, 67, 80, 81, 82].includes(weather_code))
      return "rainy";
    if ([71, 73, 75, 77, 85, 86].includes(weather_code)) return "snowy";
    if ([45, 48].includes(weather_code)) return "mist";
    if (!is_day && cloud_cover > 10) return "cloudyNight";
    if (!is_day) return "night";
    if (cloud_cover > 50) return "cloudy";
    if (cloud_cover > 10) return "partlyCloudy";

    return "sunny"; // Default
  };

  const handleDisplayWeatherImage = (weatherData, size, isFuture = false) => {
    const weatherIconMap = {
      night: { icon: Moon, alt: "moon" },
      sunny: { icon: sunny, alt: "sun" },
      partlyCloudy: { icon: sunAndCloud, alt: "sun and cloud" },
      cloudy: { icon: Clouds, alt: "clouds" },
      cloudyNight: { icon: cloudyNight, alt: "cloudy night" },
      rainy_night: { icon: rainy_night, alt: "rainy night" },
      snowy: { icon: snow, alt: "snow" },
      rainy: { icon: rainy, alt: "rainy" },
      thunderstorm: { icon: Thunderstorm, alt: "thunderstorm" },
      mist: { icon: mist, alt: "mist" },
    };

    // If weatherData is just a weather_code (for future forecast), wrap it in an object
    const weatherInfo =
      typeof weatherData === "number"
        ? { weather_code: weatherData }
        : weatherData;

    const conditionKey = getWeatherConditionKey(weatherInfo, isFuture);
    const { icon, alt } =
      weatherIconMap[conditionKey] || weatherIconMap["sunny"];

    return <img src={icon} alt={alt} className={`${size} object-cover`} />;
  };

  // Displays different images depending on weather conditions

  return (
    <GlobalContext.Provider
      value={{
        location,
        setLocation,
        isDarkMode,
        setIsDarkMode,
        data,
        setData,
        weatherData,
        setWeatherData,
        inputValue,
        setInputValue,
        toggleDarkMode,
        handleDisplayWeatherImage,
        loading,
        setLoading,
        showContent,
        setShowContent,
        currentModal,
        setCurrentModal,
        currentTitle,
        setCurrentTitle,
        isFrontPage,
        setIsFrontPage,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
