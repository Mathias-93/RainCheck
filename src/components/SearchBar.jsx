import React, { useContext } from "react";
import { GlobalContext } from "../Context";
import DarkMode from "./DarkMode";

export default function SearchBar() {
  const { setInputValue, inputValue, setLocation, weatherData, isFrontPage } =
    useContext(GlobalContext);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(inputValue);
  };
  return (
    <div
      className={`flex items-center p-2 gap-2 sm:w-[80%] md:w-[60%] lg:w-[60%] lg:mt-5 ${
        weatherData ? "justify-between" : "justify-center"
      }`}
    >
      <form
        className="flex gap-2 h-12 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center">
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="Search location.."
            className="w-28 h-10 sm:w-48 sm:h-12 md:w-56 md:h-12 lg:w-64 lg:h-14 lg:text-xl border border-gray-600 p-4 rounded-l-3xl border-r-0 bg-gray-100 dark:dark-gradient-panels shadow-lg transition-colors duration-300 dark:text-gray-100 text-slate-700"
          />
          <button
            type="submit"
            className="flex items-center justify-center h-10 sm:h-12 sm:w-20 lg:h-14 lg:text-lg 2xl:text-2xl 2xl:w-16 text-sm border border-l-0 border-gray-600 rounded-r-3xl px-2  bg-gray-100 dark:dark-gradient-search dark:text-gray-100 shadow-lg transition-colors duration-300 text-slate-700"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
