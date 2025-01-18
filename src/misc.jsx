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
