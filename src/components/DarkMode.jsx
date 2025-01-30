import React, { useContext } from "react";
import { GlobalContext } from "../Context";

export default function DarkMode() {
  const { isDarkMode, toggleDarkMode } = useContext(GlobalContext);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        onClick={toggleDarkMode}
        className={`w-14 h-8 lg:w-16 lg:h-9 flex items-center border border-gray-600 bg-white dark:dark-gradient-toggle rounded-full p-1 cursor-pointer transition-colors duration-300 ${
          isDarkMode ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white dark:bg-gray-900 w-6 h-6 lg:w-7 lg:h-7 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
            isDarkMode ? "translate-x-6 lg:translate-x-7" : "translate-x-0"
          }`}
        >
          {isDarkMode ? (
            <i className="fa-regular fa-moon text-yellow-300 flex items-center justify-center"></i>
          ) : (
            <i className="fa-solid fa-sun text-yellow-400 flex items-center justify-center"></i>
          )}
        </div>
      </div>
    </div>
  );
}
