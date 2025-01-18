import { useEffect, useContext } from "react";
import "./index.css";
import SideBar from "./components/SideBar";
import SearchBar from "./components/SearchBar";
import WeatherPanel from "./components/WeatherPanel";
import TodaysForecast from "./components/TodaysForecast";
import WeatherConditions from "./components/WeatherConditions";
import FutureForecast from "./components/FutureForecast";
import { GlobalContext } from "./Context";

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
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
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
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&minutely_15=weather_code,lightning_potential&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,snowfall,weather_code,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,uv_index,is_day,sunshine_duration&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,uv_index_max,precipitation_sum,rain_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&wind_speed_unit=ms&timezone=auto&models=best_match`
      );
      if (APIWeatherData) setWeatherData(APIWeatherData);
      console.log(APIWeatherData);
    };

    fetchData();
  }, [location]);

  return (
    <>
      <div
        id="project-wrapper"
        className="min-h-screen flex justify-center dark:bg-slate-900 bg-gray-100 transition-colors duration-300 font-inter"
      >
        <div
          id="main-container"
          className="p-4 w-[80%] min-h-[800px] dark:bg-slate-700 bg-sky-100 shadow-lg rounded-lg flex gap-5 my-5 transition-colors duration-300"
        >
          <SideBar />
          <div id="middle-container" className="flex flex-col w-[65%]">
            <SearchBar />

            <WeatherPanel />

            {weatherData && (
              <div
                id="todays-forecast-div"
                className="flex flex-col flex-grow-1 p-4 bg-sky-200 shadow-lg dark:text-gray-200 dark:bg-slate-500 rounded w-[80%] mt-[50px] ml-[20px] gap-5 text-slate-700 transition-colors duration-300 overflow-y-hidden"
              >
                <TodaysForecast formatDate={formatDate} />
              </div>
            )}
            {weatherData && (
              <div
                id="weather-conditions-div"
                className="flex flex-col items-center justify-center p-5 gap-5 rounded w-[80%] max-h-full mt-[50px] ml-[20px]  text-slate-700 transition-colors duration-300"
              >
                <WeatherConditions />
              </div>
            )}
          </div>
          <div
            id="future-forecast-div"
            className="flex flex-col p-5 bg-sky-200 shadow-lg dark:text-gray-200 dark:bg-slate-500 rounded w-[30%] max-h-full ml-[20px] gap-5 text-slate-700 transition-colors duration-300"
          >
            <FutureForecast />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
