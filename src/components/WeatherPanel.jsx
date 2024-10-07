import React from "react";

export default function WeatherPanel() {
  return (
    <div className="ml-[100px] mt-[20px] flex gap-16 text-slate-700">
      <div className="flex flex-col gap-[100px]">
        <div className="flex flex-col gap-4">
          <p>Location:</p>
          <p>Chance of rain:</p>
        </div>
        <div className="flex flex-col gap-4">
          <p>Temperature:</p>
          <p>Real Feel:</p>
        </div>
      </div>
      <div>
        <p>
          some way to indicate day/night, like a different backdrop or something
        </p>
      </div>
      <div>ICON</div>
    </div>
  );
}
