import React, { useContext } from "react";
import { GlobalContext } from "../Context";

export default function TodaysForecast(props) {
  const { formatDate } = props;
  const { weatherData } = useContext(GlobalContext);

  const formatDailyData = () => {
    const maxHours = 24;
    const currentTime = new Date();
    const minHours = currentTime.getHours() + 1;
    const formattedTime = weatherData?.hourly?.time
      .slice(minHours, maxHours)
      .map((time, index) => ({
        hour: new Date(time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        temp: weatherData?.hourly?.temperature_2m[index],
      }));

    return (
      <>
        {formattedTime?.map((item, index) => {
          return (
            <div key={index} className="flex flex-col w-[125px] flex-shrink-0">
              <p>{`Time: ${item.hour}`}</p>
              <p>ICON</p>
              <p>{`Temp: ${item.temp}°C`}</p>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col text-center">
        <h3 className="text-lg font-semibold text-left">
          Hourly {formatDate(weatherData?.current?.time)}
        </h3>
      </div>
      <div className="flex gap-5 p-1 overflow-x-auto overflow-y-hidden">
        {formatDailyData()}
      </div>
    </>
  );
}
