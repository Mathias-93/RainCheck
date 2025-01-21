import React, { useContext } from "react";
import { GlobalContext } from "../Context";
import { formatDate } from "../utils/helper-functions/helper";

export default function FutureForecastCard({ date, tempMin, tempMax, icon }) {
  return (
    <div className="w-full h-[150px] bg-sky-100 rounded-xl flex flex-col items-center justify-center dark:bg-slate-700 shadow-lg gap-2">
      <p className="font-semibold">{formatDate(date)}</p>
      {icon}
      <p className="font-semibold">{tempMax}°</p>
      <p className="font-semibold">{tempMin}°</p>
    </div>
  );
}
