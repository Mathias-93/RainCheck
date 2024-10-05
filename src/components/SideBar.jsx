import React from "react";

export default function SideBar(props) {
  const { toggleDarkMode, isDarkMode } = props;

  return (
    <div
      className="flex flex-col w-[150px] p-2 h-[100%] gap-10 rounded shadow-lg 
        dark:bg-slate-500 text-gray-200  bg-sky-300 transition-colors duration-300"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="mr-2 text-sm text-white">
          {isDarkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
        </span>
        <div
          onClick={toggleDarkMode}
          className={`w-14 h-8 flex items-center bg-gray-200 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            isDarkMode ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white dark:bg-gray-900 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
              isDarkMode ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
}
