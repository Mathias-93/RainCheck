import { useEffect, useContext, useState } from "react";
import "./index.css";
import SearchBar from "./components/SearchBar";
import WeatherPanel from "./components/WeatherPanel";
import TodaysForecast from "./components/TodaysForecast";
import WeatherConditions from "./components/WeatherConditions";
import FutureForecast from "./components/FutureForecast";
import { GlobalContext } from "./Context";
import { getRandomNumber } from "./utils/helper-functions/helper";
import { weatherQuotes } from "./utils/data/data";
import DarkMode from "./components/DarkMode";
import sun_sunglasses from "./assets/images/sun_sunglasses.png";

function App() {
  const {
    location,
    setLocation,
    setData,
    setWeatherData,
    weatherData,
    setIsDarkMode,
    loading,
    setLoading,
    currentTitle,
    setCurrentTitle,
    error,
    setError,
  } = useContext(GlobalContext);

  const formatDate = (timeString) => {
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

  // Generic API fetching function
  const fetchAPIdata = async (url) => {
    try {
      setLoading(true);

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();

      if (!data || data.length === 0) return null; // Handle empty response
      return data;
    } catch (err) {
      console.log(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleChangeTitle = () => {
    setCurrentTitle(weatherQuotes[getRandomNumber()]);
  };

  if (!currentTitle) handleChangeTitle();

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

      if (data !== null) {
        console.log(data);

        setData(data);
        if (data.length > 0 && location !== data[0].name) {
          setLocation(data[0].name);
        }

        const { lat, lon } = data[0]; // Deconstruct latitude and longitude from location API data
        /* https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,snowfall,snow_depth,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,rain_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max&wind_speed_unit=ms */

        const APIWeatherData = await fetchAPIdata(
          // Using the lat and lon from location to get current local weather
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&minutely_15=weather_code,lightning_potential&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,snowfall,weather_code,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,uv_index,is_day,sunshine_duration&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,uv_index_max,precipitation_sum,rain_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&wind_speed_unit=ms&timezone=auto&models=best_match`
        );
        if (APIWeatherData) {
          setWeatherData(APIWeatherData);
        }
        console.log(APIWeatherData);
        setError(null);
      } else {
        setLocation("");
        setWeatherData(null);
        setError("Error: Could not find location.");
      }
    };

    fetchData();
  }, [location]);

  return (
    <>
      <div
        id="project-wrapper"
        className="min-h-screen flex relative justify-center bg-[url('../lightmode-bg-3.jpg')] dark:bg-[url('../darkmode-bg.jpg')] bg-cover bg-center bg-no-repeat bg-gray-100 transition-colors duration-300 font-inter"
      >
        {loading && (
          <img
            src={sun_sunglasses}
            alt="sun with sunglasses"
            className="w-[100px] 2xl:w-[350px] object-cover animate-spin absolute top-56 z-10"
          />
        )}
        <div className="absolute left-7 top-7">
          <DarkMode />
        </div>

        <div
          id="main-container"
          className="flex flex-col 1xl:flex-row lg:flex-col 2xl:flex-row justify-center items-center 2xl:mt-5 w-[95%] h-[95%] 2xl:w-[70%] min-h-[800px] pb-10 dark:bg-none rounded-lg gap-5 my-3 transition-colors duration-300"
        >
          <div
            id="middle-container"
            className={`flex flex-col w-full justify-center items-center gap-5 p-1 2xl:w-[60%] ${
              !weatherData ? "2xl:h-[500px]" : ""
            }`}
          >
            {!weatherData && (
              <div className="flex flex-col gap-5 text-center">
                <h1 className="text-4xl font-bold text-white text-shadow-light dark:text-shadow-dark">
                  RainCheck Weather ☔
                </h1>
                <div
                  className="w-full overflow-hidden whitespace-nowrap relative 
                  border-t border-b border-line-shadow-light dark:border-yellow-500 p-2"
                >
                  <h3
                    className="inline-block text-lg text-white min-w-full 
                   animate-marquee transition-all duration-300"
                  >
                    This just in: {currentTitle}
                  </h3>
                </div>
              </div>
            )}

            <SearchBar />
            <div className="min-h-[35px]">
              {error && <p className="text-2xl text-white">{error}</p>}
            </div>
            <WeatherPanel />

            {weatherData && !error ? (
              <div
                id="todays-forecast-div"
                className="flex flex-col p-2 w-full sm:w-[70%] border dark:border-gray-600 lg:w-[60%] lg:p-6 mt-5 2xl:w-[75%] light-gradient-panels shadow-lg dark:text-gray-200 dark:dark-gradient-panels rounded gap-5 text-slate-700 transition-colors duration-300"
              >
                <TodaysForecast formatDate={formatDate} />
              </div>
            ) : null}
            {weatherData && (
              <div
                id="weather-conditions-div"
                className="flex flex-col w-full sm:w-[90%] 2xl:w-[80%] items-center justify-center p-2 gap-2 mt-4 rounded text-slate-700 transition-colors duration-300"
              >
                <WeatherConditions />
              </div>
            )}
          </div>

          {weatherData && (
            <div
              id="future-forecast-div"
              className="flex flex-col items-center justify-center 2xl:items-start w-full 2xl:w-[25%] sm:w-[80%] p-2 shadow-lg dark:text-gray-200 dark:bg-transparent rounded-lg  text-slate-700 transition-colors duration-300 2xl:shadow-none"
            >
              <FutureForecast />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
