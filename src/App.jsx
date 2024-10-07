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

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
    const LOCATION_KEY = import.meta.env.VITE_WEATHER_APP_API_KEY;
    const fetchAPIdata = async () => {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${LOCATION_KEY}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setData(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchAPIdata();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
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
            <SearchBar />
            <WeatherPanel data={data} />
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
