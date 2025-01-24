// Main container
<div
  id="main-container"
  className="p-[50px] w-[65%] min-h-[800px] dark:bg-slate-700 bg-sky-100 shadow-lg rounded-lg flex gap-2 my-3 transition-colors duration-300"
></div>;

// FutureForecast div
<div
  id="future-forecast-div"
  className="flex flex-col p-5 bg-sky-200 shadow-lg dark:text-gray-200 dark:bg-slate-500 rounded w-[17%] max-h-full ml-[20px] gap-5 text-slate-700 transition-colors duration-300"
>
  <FutureForecast />
</div>;

// Search bar
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
</form>;

// WeatherPanel
<div className="flex justify-between mr-[200px] p-6 text-slate-700 dark:text-gray-200 transition-colors duration-300">
  <div className="flex flex-col gap-[100px]">
    <div className="flex flex-col gap-4">
      {loading ? (
        <p className="text-4xl font-semibold">Loading...</p>
      ) : (
        <p className="text-4xl font-semibold">
          {location ? location : "Please search for a location."}
        </p>
      )}
      <p className="text-2xl">
        {currentWeather?.temperature_2m !== undefined
          ? `${weatherData.current.temperature_2m} °C`
          : null}
      </p>
    </div>
    <div className="flex flex-col gap-4">
      <WeatherCode currentWeatherCode={currentWeather?.weather_code} />
      <p className="text-lg">
        {currentWeather?.apparent_temperature !== undefined
          ? `Feels like ${currentWeather.apparent_temperature}°C`
          : null}
      </p>
    </div>
  </div>
  {weatherData && (
    <div className="min-w-[225px]">
      {handleDisplayWeatherImage(currentWeather, "h-[225px]")}
    </div>
  )}
</div>;

// Hourly forecast scroll
<div className="flex flex-col gap-2">
<div className="flex justify-center">
  <h3 className="text-lg font-semibold">
    Hourly {formatDate(weatherData?.current?.time)}
  </h3>
</div>
<div className="flex justify-between gap-2">
  <div className="min-w-[25px] flex justify-center rounded-md bg-sky-300 hover:bg-opacity-75 dark:bg-slate-700 dark:hover:bg-slate-600">
    <button
      onClick={scrollLeft}
      className="w-full rounded-md bg-sky-300 hover:bg-opacity-30 dark:bg-slate-700 dark:hover:bg-slate-600"
    >
      <i className="fa-solid fa-caret-left text-3xl text-gray-600 dark:text-slate-300" />
    </button>
  </div>
  <div
    ref={scrollRef}
    className="flex gap-1 pb-2 p-1 overflow-x-auto overflow-y-hidden scrollbar-none"
  >
    {formatDailyData()}
  </div>
  <div className="min-w-[25px] flex justify-center rounded-md bg-sky-300 hover:bg-opacity-75 dark:bg-slate-700 dark:hover:bg-slate-600">
    <button
      onClick={scrollRight}
      className="w-full rounded-md bg-sky-300 hover:bg-opacity-30 dark:bg-slate-700 dark:hover:bg-slate-600"
    >
      <i className="fa-solid fa-caret-right text-3xl text-gray-600 dark:text-slate-300 " />
    </button>
  </div>
</div>
</div>

// Weather Conditions

<>
<div className="flex flex-col text-center">
  <h3 className="text-lg font-semibold">Weather Conditions</h3>
</div>

<div className="grid grid-cols-2 gap-8 p-4">
  <WeatherConditionsCard
    id="precipitation"
    title={"Precipitation"}
    icon={"cloud-showers-heavy"}
  >
    {weatherData?.current?.precipitation >= 0 && (
      <h1 className="text-5xl font-semibold p-3">
        {weatherData?.current?.precipitation}{" "}
        {weatherData?.current_units.precipitation}
      </h1>
    )}
    <h3 className="text-lg font-semibold p-3">
      Probability {weatherData?.daily?.precipitation_probability_max[0]}%
    </h3>
  </WeatherConditionsCard>

  <WeatherConditionsCard id="wind" title={"Wind"} icon={"wind"}>
    <h1 className="text-5xl font-semibold p-3">
      {weatherData?.current?.wind_speed_10m}{" "}
      {weatherData?.current_units?.wind_speed_10m}
    </h1>
    <h3 className="text-lg font-semibold p-3">
      {weatherData?.current?.wind_direction_10m
        ? `From ${windDirection(
            parseInt(weatherData.current.wind_direction_10m)
          )}`
        : "No data found"}
    </h3>
  </WeatherConditionsCard>

  <WeatherConditionsCard
    id="sunrise-sunset"
    title={"Sunrise & sunset"}
    icon={"sun"}
  >
    <div className="flex">
      <h3 className="text-lg font-semibold p-3 flex gap-2 items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <i className="fa-solid fa-chevron-up text-sm"></i>
          <i className="fa-regular fa-sun"></i>
        </div>{" "}
        {formattedSunriseTimeString}
      </h3>
    </div>
    <hr className="bg-slate-500 h-[2px] border-0" />
    <div className="flex">
      <h3 className="text-lg font-semibold p-3 flex gap-2 items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <i className="fa-solid fa-chevron-down text-sm"></i>
          <i className="fa-regular fa-sun"></i>
        </div>{" "}
        {formattedSunsetTimeString}
      </h3>
    </div>
  </WeatherConditionsCard>

  <WeatherConditionsCard
    id="uv-index"
    title={"UV index"}
    icon={"cloud-sun"}
  >
    <i
      onClick={() => {
        setShowContent(true);
        setCurrentModal("uv");
      }}
      className="fa-regular fa-circle-question z-10 absolute right-6 top-6 cursor-pointer"
    ></i>
    <h3 className="text-5xl font-semibold p-3">
      {weatherData?.hourly?.uv_index[0]}
    </h3>
    <div className="flex gap-2 items-center">
      <p className="font-semibold">{uvIndexInfo.label}</p>
      <i className={`fa-solid fa-circle ${uvIndexInfo.color}`}></i>
    </div>
    <p className="font-semibold">{uvIndexInfo.advice}</p>
  </WeatherConditionsCard>

  <WeatherConditionsCard
    id="humidity"
    title={"Relative humidity"}
    icon={"droplet"}
  >
    <div
      className="absolute bottom-0 left-0 w-full bg-sky-300 transition-all duration-500 opacity-60 dark:bg-slate-400 dark:text-slate-100 text-gray-600 rounded-b-2xl rounded-t-md"
      style={{
        height: `${weatherData?.current?.relative_humidity_2m || 0}%`,
      }}
    ></div>

    <div className="z-10 flex w-full h-full p-3 ml-5">
      <h3 className="text-5xl font-semibold">
        {weatherData?.current?.relative_humidity_2m
          ? `${weatherData.current.relative_humidity_2m}%`
          : "No data found"}
      </h3>
    </div>
  </WeatherConditionsCard>

  <WeatherConditionsCard
    id="visibility"
    icon={"eye"}
    title={"Visibility"}
  >
    <i
      onClick={() => {
        setShowContent(true);
        setCurrentModal("visibility");
      }}
      className="fa-regular fa-circle-question absolute right-6 top-6 cursor-pointer z-10"
    ></i>
    <h3 className="text-5xl font-semibold p-3">
      {weatherData?.hourly?.visibility[0] / 1000} km
    </h3>
    <p className="font-semibold pl-5">
      {kilometersToMiles(weatherData?.hourly?.visibility[0] / 1000)} miles
    </p>
  </WeatherConditionsCard>
</div>

{/* Modal */}
{showContent && <WeatherConditionsInfoModal ref={ref} />}
</>

// FutureForecastCard

<div className="w-full h-[150px] bg-sky-100 rounded-xl flex flex-col items-center justify-center dark:bg-slate-700 shadow-lg gap-2">
      <p className="font-semibold">{formatDate(date)}</p>
      {icon}
      <p className="font-semibold">{tempMax}°</p>
      <p className="font-semibold">{tempMin}°</p>
    </div>