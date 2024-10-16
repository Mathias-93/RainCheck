import React from "react";
import DarkMode from "./DarkMode";

export default function SideBar(props) {
  const { toggleDarkMode, isDarkMode } = props;

  return (
    <div
      className="flex flex-col w-[150px] p-2 h-[100%] gap-10 rounded shadow-lg 
        dark:bg-slate-500 text-gray-200  bg-sky-200 transition-colors duration-300"
    >
      <DarkMode toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
    </div>
  );
}
