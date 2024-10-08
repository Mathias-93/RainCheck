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
  const [inputValue, setInputValue] = useState("");

  // Location API fetching function
  const fetchAPIdata = async () => {
    const LOCATION_KEY = import.meta.env.VITE_WEATHER_APP_API_KEY;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${LOCATION_KEY}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setData(data);
      setLocation(data[0].name);
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
    fetchAPIdata();
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
            <WeatherPanel location={location} />
            <TodaysForecast />
            <WeatherConditions />
          </div>
          <div id="future-forecast-div">
            <FutureForecast />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
