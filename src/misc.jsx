<div
  id="humidity-container"
  className="relative flex flex-col items-center gap-2 p-3 w-[350px] h-[200px] bg-sky-200 rounded-2xl overflow-hidden"
>
  <div
    className="absolute bottom-0 left-0 w-full bg-sky-300 transition-all duration-500 opacity-60 wavy-top"
    style={{
      height: `${weatherData?.current?.relative_humidity_2m || 0}%`,
    }}
  ></div>

  {/* Text stays above the waves */}
  <div className="z-10 flex gap-2 w-full h-[20%] p-3">
    <h3 className="text-2xl font-semibold flex items-center">
      Relative Humidity
    </h3>
    <i className="fa-solid fa-droplet flex items-center text-2xl"></i>
  </div>

  <div className="z-10 flex w-full h-full p-3 ml-5">
    <h3 className="text-5xl font-semibold">
      {weatherData?.current?.relative_humidity_2m
        ? `${weatherData.current.relative_humidity_2m}%`
        : "No data found"}
    </h3>
  </div>
</div>;
