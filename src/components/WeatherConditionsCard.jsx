import React from "react";

export default function WeatherConditionsCard({ children, title, icon }) {
  return (
    <div className="relative flex flex-col p-4 w-[300px] h-[200px] bg-sky-200 rounded-2xl dark:bg-slate-500 dark:text-slate-200 text-gray-600 shadow-lg">
      <div className="z-10 flex gap-2 w-full h-[20%]">
        <i className={`fa-solid fa-${icon} flex items-center text-2xl`}></i>
        <h3 className="text-2xl font-semibold flex items-center">{title}</h3>
      </div>
      <div className="flex flex-col w-full h-full">{children}</div>
    </div>
  );
}
