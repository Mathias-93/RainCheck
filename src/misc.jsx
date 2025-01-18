<div className="flex">
  {formattedTime
    .slice(new Date().getHours(), new Date().getHours() + 24)
    .map((item, index) => {
      return (
        <div key={index} className="flex flex-col w-[90px] gap-2">
          <p className="w-[20px]">{`${item.hour}`}</p>
          <div>{handleDisplayWeatherImage(item, "h-[30px]")}</div>
          <p>{`${item.temp}°`}</p>
        </div>
      );
    })}
</div>;

<div
  id="weather-conditions-div"
  className="flex flex-col p-5 bg-sky-200 shadow-lg dark:text-gray-200 dark:bg-slate-500 rounded w-[80%] max-h-full mt-[50px] ml-[20px] gap-5 text-slate-700 transition-colors duration-300 "
>
  <WeatherConditions />
</div>;

<>
  <div className="flex flex-col text-center">
    <h3 className="text-lg font-semibold">Weather Conditions</h3>
  </div>

  <div className="flex gap-8">
    <div>
      <div className="flex gap-2 items-center ">
        <h3 className="text-lg font-semibold">Windspeed</h3>
        <i className="fa-solid fa-wind"></i>
      </div>
      <p>
        {weatherData?.current?.wind_speed_10m
          ? `${weatherData.current.wind_speed_10m} m/s`
          : "No data found"}
      </p>
    </div>
    <div>
      <div className="flex gap-2 items-center ">
        <h3 className="text-lg font-semibold">Relative Humidity</h3>
        <i className="fa-solid fa-droplet"></i>
      </div>
      <p>
        {weatherData?.current?.relative_humidity_2m
          ? `${weatherData.current.relative_humidity_2m}%`
          : "No data found"}
      </p>
    </div>
    <div>
      <div className="flex gap-2 items-center ">
        <h3 className="text-lg font-semibold">Rainfall</h3>
        <i className="fa-solid fa-cloud-showers-heavy"></i>
      </div>
      <p>
        {weatherData?.current?.rain
          ? `${weatherData.current.rain}mm`
          : "No rain right now!"}
      </p>
    </div>
    <div>
      <p>Time</p>
      <p>Icon rep weather</p>
      <p>Temp</p>
    </div>
  </div>
  <div className="flex gap-8">
    <div>
      <div className="flex gap-2 items-center ">
        <h3 className="text-lg font-semibold">Wind Direction</h3>
        <i className="fa-solid fa-wind"></i>
      </div>
      <p>
        {weatherData?.current?.wind_direction_10m
          ? `${windDirection(parseInt(weatherData.current.wind_direction_10m))}`
          : "No data found"}
      </p>
    </div>
    <div>
      <p>Time</p>
      <p>Icon rep weather</p>
      <p>Temp</p>
    </div>
    <div>
      <p>Time</p>
      <p>Icon rep weather</p>
      <p>Temp</p>
    </div>
    <div>
      <p>asd</p>
      <p>Icon rep weather</p>
      <p>Temp</p>
    </div>
  </div>
</>;

<div
  id="humidity-container"
  className="relative flex flex-col items-center gap-2 p-3 w-[350px] h-[200px] bg-sky-200 rounded overflow-hidden"
>
  <div
    className="absolute bottom-0 left-0 w-full bg-sky-300 bg-opacity-60 transition-all duration-500"
    styles={{
      height: `${weatherData?.current?.relative_humidity_2m || 0}`,
    }}
  ></div>

  <div className="z-10 flex gap-2 w-full h-[20%] p-3">
    <h3 className="text-lg font-semibold flex items-center ">
      Relative Humidity
    </h3>
    <i className="fa-solid fa-droplet flex items-center"></i>
  </div>
  <div className="z-10 flex w-full h-full p-3 ml-5">
    <p className="text-4xl">
      {weatherData?.current?.relative_humidity_2m
        ? `${weatherData.current.relative_humidity_2m}%`
        : "No data found"}
    </p>
  </div>
</div>;
