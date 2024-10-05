import React from "react";

export default function SideBar(props) {
  const { toggleDarkMode } = props;

  return (
    <div
      className="flex flex-col w-24 p-2 h-[100%] gap-10 rounded shadow-lg 
        dark:bg-slate-500 dark:text-gray-200  bg-sky-300 "
    >
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </div>
  );
}
