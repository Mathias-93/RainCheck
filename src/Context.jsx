import { createContext } from "react";
import { useState } from "react";
import sunAndCloud from "./assets/images/sunAndCloud.png";
import sunny from "./assets/images/sunny.png";
import Clouds from "./assets/images/Clouds.png";
import Moon from "./assets/images/moon-phase.png";
import cloudyNight from "./assets/images/cloudy-night.png";
import Snow from "./assets/images/snow.png";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [location, setLocation] = useState("Kalmar");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [inputValue, setInputValue] = useState("");

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  // Displays different images on the front page depending on weather conditions
  const handleDisplayWeatherImage = (weatherData, size) => {
    const currentWeather = weatherData?.current;

    if (!currentWeather) return <img src={sunny} alt="sun" className={size} />;

    if (!currentWeather?.is_day) {
      return <img src={Moon} alt="moon" className={size} />;
    }

    if (
      currentWeather?.cloud_cover <= 50 &&
      currentWeather?.cloud_cover >= 25 &&
      currentWeather?.is_day
    ) {
      return (
        <img src={sunAndCloud} alt="sun and cloud icon" className={size} />
      );
    }

    if (
      currentWeather?.cloud_cover < 25 &&
      currentWeather?.is_day &&
      currentWeather?.precipitation === 0
    ) {
      return <img src={sunny} alt="sun" className={size} />;
    }

    if (
      currentWeather?.cloud_cover > 50 &&
      currentWeather?.is_day &&
      currentWeather?.precipitation === 0
    ) {
      return <img src={Clouds} alt="clouds" className={size} />;
    }

    if (
      currentWeather?.cloud_cover > 50 &&
      !currentWeather?.is_day &&
      currentWeather?.precipitation === 0
    ) {
      return <img src={cloudyNight} alt="clouds and moon" className={size} />;
    }

    if (currentWeather?.snowfall > 0) {
      return <img src={Snow} alt="clouds and moon" className={size} />;
    }
    return <img src={sunAndCloud} alt="sun and cloud icon" className={size} />;
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
