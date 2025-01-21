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
    <div className="flex ml-10">
      <DarkMode />
      <form className="flex gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleInputChange}
          className="w-[300px] h-[50px] ml-[100px] rounded p-4 bg-gray-100 dark:bg-slate-500 shadow-lg transition-colors duration-300 dark:text-gray-100 text-slate-700"
        />
        <button
          type="submit"
          className="border rounded p-3 sm:p-3 bg-gray-100 dark:bg-slate-500 xl:w-[110px] dark:text-gray-100 shadow-lg transition-colors duration-300 text-slate-700"
        >
          Search
        </button>
      </form>
    </div>
  );
}
