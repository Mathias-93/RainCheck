import { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import SearchBar from "./components/SearchBar";
import WeatherPanel from "./components/WeatherPanel";
import TodaysForecast from "./components/TodaysForecast";
import WeatherConditions from "./components/WeatherConditions";
import FutureForecast from "./components/FutureForecast";
import sunAndCloud from "./assets/images/sunAndCloud.png";
import Sun from "./assets/images/Sun.png";
import Clouds from "./assets/images/Clouds.png";
import Moon from "./assets/images/moon-phase.png";
import cloudyNight from "./assets/images/cloudy-night.png";
import Snow from "./assets/images/snow.png";

function App() {
  const [location, setLocation] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [inputValue, setInputValue] = useState("");

  // Generic API fecthing function
  const fetchAPIdata = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    // Get theme from local storage if there is any, set the theme to that theme and toggle "dark" in tailwind
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  // Fetch API when the location variable changes
  useEffect(() => {
    if (!location) return;
    const fetchData = async () => {
      const data = await fetchAPIdata(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${
          import.meta.env.VITE_WEATHER_APP_API_KEY
        }`
      );

      setData(data);
      if (data.length > 0) {
        setLocation(data[0].name);
      }

      const { lat, lon } = data[0]; // Deconstruct latitude and longitude from location API data
      /* https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,snowfall,snow_depth,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,rain_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max&wind_speed_unit=ms */

      const APIWeatherData = await fetchAPIdata(
        // Using the lat and lon from location to get current local weather
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,snowfall,snow_depth,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,rain_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max&wind_speed_unit=ms`
      );
      if (APIWeatherData) setWeatherData(APIWeatherData);
      console.log(APIWeatherData);
    };

    fetchData();
  }, [location]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(inputValue);
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const getDaySuffix = (day) => {
      if (day >= 11 && day <= 13) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const [month, day] = [months[date.getMonth()], date.getDate()];
    return `Forecast ${month} ${day}${getDaySuffix(day)}`;
  };

  // Displays different images on the front page depending on weather conditions
  const handleDisplayWeatherImage = (weatherData) => {
    const currentWeather = weatherData?.current;

    if (!currentWeather) return null;

    if (!currentWeather?.is_day) {
      return <img src={Moon} alt="moon" className="h-[225px]" />;
    }

    if (
      currentWeather?.cloud_cover <= 50 &&
      currentWeather?.cloud_cover >= 25 &&
      currentWeather?.is_day
    ) {
      return (
        <img src={sunAndCloud} alt="sun and cloud icon" className="h-[225px]" />
      );
    }

    if (
      currentWeather?.cloud_cover < 25 &&
      currentWeather?.is_day &&
      currentWeather?.precipitation === 0
    ) {
      return <img src={Sun} alt="sun" className="h-[225px]" />;
    }

    if (
      currentWeather?.cloud_cover > 50 &&
      currentWeather?.is_day &&
      currentWeather?.precipitation === 0
    ) {
      return <img src={Clouds} alt="clouds" className="h-[225px]" />;
    }

    if (
      currentWeather?.cloud_cover > 50 &&
      !currentWeather?.is_day &&
      currentWeather?.precipitation === 0
    ) {
      return (
        <img src={cloudyNight} alt="clouds and moon" className="h-[225px]" />
      );
    }

    if (currentWeather?.snowfall === 0) {
      return <img src={Snow} alt="clouds and moon" className="h-[225px]" />;
    }
    return (
      <img src={sunAndCloud} alt="sun and cloud icon" className="h-[225px]" />
    );
  };

  return (
    <>
      <div
        id="project-wrapper"
        className="min-h-screen flex justify-center dark:bg-slate-900 bg-gray-100 transition-colors duration-300 font-inter"
      >
        <div
          id="main-container"
          className="p-4 w-[80%] max-h-screen dark:bg-slate-700 bg-sky-200 shadow-lg rounded-lg flex gap-5 my-5 transition-colors duration-300"
        >
          <SideBar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
          <div id="middle-container" className="flex flex-col">
            <SearchBar
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
            />

            <WeatherPanel
              location={location}
              weatherData={weatherData}
              handleDisplayWeatherImage={handleDisplayWeatherImage}
            />

            <div
              id="todays-forecast-div"
              className="flex flex-col p-5 bg-sky-300 shadow-lg text-slate-100 dark:text-gray-200 dark:bg-slate-500 transition-colors duration-300 rounded w-[80%} max-h-full mt-[50px] ml-[20px] gap-5 text-slate-700 dark:text-gray-200 transition-colors duration-300"
            >
              <TodaysForecast
                weatherData={weatherData}
                formatTime={formatTime}
              />
            </div>
            <div
              id="todays-forecast-div"
              className="flex flex-col p-5 bg-sky-300 shadow-lg text-slate-100 dark:text-gray-200 dark:bg-slate-500 transition-colors duration-300 rounded w-[80%} max-h-full mt-[50px] ml-[20px] gap-5 text-slate-700 dark:text-gray-200 transition-colors duration-300"
            >
              <WeatherConditions weatherData={weatherData} />
            </div>
          </div>
          <div
            id="future-forecast-div"
            className="flex flex-col p-5 bg-sky-300 shadow-lg text-slate-100 dark:text-gray-200 dark:bg-slate-500 transition-colors duration-300 rounded w-[80%} max-h-full ml-[20px] gap-5 text-slate-700 dark:text-gray-200 transition-colors duration-300"
          >
            <FutureForecast />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
