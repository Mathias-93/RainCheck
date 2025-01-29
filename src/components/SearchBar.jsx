import React, { useContext } from "react";
import { GlobalContext } from "../Context";
import DarkMode from "./DarkMode";

export default function SearchBar() {
  const { setInputValue, inputValue, setLocation } = useContext(GlobalContext);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(inputValue);
  };
  return (
    <div className="flex items-center justify-center p-2 gap-2 sm:w-[80%] md:w-[60%] lg:w-[60%] lg:mt-5 lg:justify-between">
      <DarkMode />
      <form
        className="flex gap-2 h-12 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center p-2 gap-2">
          <input
            type="text"
            onChange={handleInputChange}
            className="w-28 h-10 sm:w-48 sm:h-12 md:w-56 md:h-12 lg:w-64 lg:h-14 lg:text-xl border border-gray-600 p-4 rounded bg-gray-100 dark:bg-gradient-to-br dark:from-[#505050] dark:to-[#303030] shadow-lg transition-colors duration-300 dark:text-gray-100 text-slate-700"
          />
          <button
            type="submit"
            className="h-10 sm:h-12 sm:w-20 lg:h-14 lg:text-lg border border-gray-600 rounded px-2 text-sm bg-gray-100 dark:bg-gradient-to-br dark:from-[#505050] dark:to-[#303030] dark:text-gray-100 shadow-lg transition-colors duration-300 text-slate-700"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
