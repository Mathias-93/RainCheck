import React, { useContext } from "react";
import { GlobalContext } from "../Context";
import { formatDate } from "../utils/helper-functions/helper";

export default function FutureForecastCard({ date, tempMin, tempMax, icon }) {
  return (
    <div className="h-[200px] 2xl:h-[150px] w-full 2xl:w-[50%] bg-sky-200 darker-blue rounded-3xl flex flex-col  items-center justify-center dark:bg-slate-500 dark:text-slate-100 shadow-lg gap-2">
      <p className="text-center text-sm md:text-base">{formatDate(date)}</p>
      {icon}
      <p className="text-sm md:text-base">{tempMax}°</p>
      <p className="text-sm md:text-base">{tempMin}°</p>
    </div>
  );
}
