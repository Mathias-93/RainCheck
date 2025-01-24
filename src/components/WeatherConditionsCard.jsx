import React from "react";

export default function WeatherConditionsCard({ children, title, icon }) {
  return (
    <div className="relative flex flex-col p-2 2xl:p-5 mt-2 w-full h-52 darker-blue rounded-2xl dark:bg-slate-500 dark:text-slate-200 text-gray-600 shadow-lg">
      <div className="z-10 flex gap-1 w-full h-[20%]">
        <i
          className={`fa-solid fa-${icon} flex items-center text-lg lg:text-xl`}
        ></i>
        <h3 className="flex items-center text-sm lg:text-xl font-semibold ">
          {title}
        </h3>
      </div>
      <div className="flex flex-col gap-1 w-full h-full">{children}</div>
    </div>
  );
}
