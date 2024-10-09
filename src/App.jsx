import { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import SearchBar from "./components/SearchBar";
import WeatherPanel from "./components/WeatherPanel";
import TodaysForecast from "./components/TodaysForecast";
import WeatherConditions from "./components/WeatherConditions";
import FutureForecast from "./components/FutureForecast";

function App() {
  const [location, setLocation] = useState("Stockholm");
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
      /* https://api.open-meteo.com/v1/forecast?latitude=59.3294&longitude=18.0687&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,cloud_cover,wind_speed_10m,uv_index,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,rain_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max&timezone=auto */
      const APIWeatherData = await fetchAPIdata(
        // Using the lat and lon from location to get current local weather
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,cloud_cover,wind_speed_10m,uv_index,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,rain_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max&timezone=auto`
      );
      if (APIWeatherData) setWeatherData(APIWeatherData);
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

  return (
    <>
      <div
        id="project-wrapper"
        className="min-h-screen flex justify-center dark:bg-slate-900 bg-gray-100 transition-colors duration-300 font-inter"
      >
        <div
          id="main-container"
          className="p-4 w-[80%] dark:bg-slate-700 bg-sky-200 shadow-lg rounded-lg flex gap-5 my-5 transition-colors duration-300"
        >
          <SideBar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
          <div id="middle-container" className="flex flex-col">
            <SearchBar
              setLocation={setLocation}
              handleSubmit={handleSubmit}
              setInputValue={setInputValue}
              inputValue={inputValue}
              handleInputChange={handleInputChange}
            />

            {weatherData && weatherData.current ? (
              <WeatherPanel location={location} weatherData={weatherData} />
            ) : (
              <div className="h-[200px] ml-[100px] mt-[20px] flex gap-16 text-slate-700 dark:text-gray-200 transition-colors duration-300">
                <div className="flex flex-col gap-[100px]">
                  <p>No data found. Please search for a location.</p>
                </div>
              </div>
            )}
            <TodaysForecast />
            <WeatherConditions />
          </div>
          <div id="future-forecast-div" className="sm:display-hidden">
            <FutureForecast />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
