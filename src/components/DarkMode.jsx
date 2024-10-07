import React from "react";

export default function DarkMode(props) {
  const { isDarkMode, toggleDarkMode } = props;

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="mr-2 text-sm dark:text-gray-100 text-white">
        {isDarkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
      </span>
      <div
        onClick={toggleDarkMode}
        className={`w-14 h-8 flex items-center bg-sky-100 dark:bg-slate-600 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
          isDarkMode ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white dark:bg-gray-900 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
            isDarkMode ? "translate-x-6" : "translate-x-0"
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
