import { createContext, useState } from "react";
import sunAndCloud from "./assets/images/sunAndCloud.png";
import sunny from "./assets/images/sunny.png";
import Clouds from "./assets/images/Clouds.png";
import Moon from "./assets/images/moon-phase.png";
import cloudyNight from "./assets/images/cloudyNight.png";
import Snow from "./assets/images/snow.png";
import rainy from "./assets/images/snow.png";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [location, setLocation] = useState("Kalmar");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  const weatherIconMap = {
    night: { icon: Moon, alt: "moon" },
    sunny: { icon: sunny, alt: "sun" },
    partlyCloudy: { icon: sunAndCloud, alt: "sun and cloud" },
    cloudy: { icon: Clouds, alt: "clouds" },
    cloudyNight: { icon: cloudyNight, alt: "cloudy night" },
    snowy: { icon: Snow, alt: "snow" },
    rainy: { icon: rainy, alt: "rainy" },
  };

  // Displays different images on the front page depending on weather conditions
  const handleDisplayWeatherImage = (weatherData, size) => {
    const currentWeather = weatherData?.current;

    if (!currentWeather) return <img src={sunny} alt="sun" className={size} />;

    let conditionKey = "sunny"; // Default

    if (currentWeather.snowfall > 0) {
      conditionKey = "snowy";
    } else if (currentWeather.rain > 0) {
      conditionKey = "rainy";
    } else if (!currentWeather.is_day && currentWeather.cloud_cover > 10) {
      conditionKey = "cloudyNight";
    } else if (!currentWeather.is_day) {
      conditionKey = "night";
    } else if (currentWeather.cloud_cover > 50) {
      conditionKey = "cloudy";
    } else if (
      currentWeather.cloud_cover > 10 &&
      currentWeather.cloud_cover <= 50
    ) {
      conditionKey = "partlyCloudy";
    }

    const { icon, alt } =
      weatherIconMap[conditionKey] || weatherIconMap["sunny"];

    return <img src={icon} alt={alt} className={size} />;
  };

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
