import React, { forwardRef, useContext, useEffect } from "react";
import { GlobalContext } from "../Context";
import { modalData } from "../utils/data/data";

const WeatherConditionsInfoModal = forwardRef((props, ref) => {
  const { setShowContent, currentModal } = useContext(GlobalContext);

  const modalObjectData = modalData.find((item) => item.id === currentModal);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowContent(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setShowContent]);

  return (
    <>
      <div className="bg-slate-500 bg-opacity-50 flex flex-col items-center justify-center fixed inset-0 z-50"></div>
      <div
        ref={ref}
        className="w-[300px] h-[450px] lg:w-[500px] lg:h-[650px] bg-slate-100 dark:bg-slate-700 dark:text-slate-200 gap-6 py-7 px-4 rounded-md shadow-lg flex flex-col z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <i
          onClick={() => setShowContent(false)}
          className="fa-solid fa-xmark absolute right-3 top-2 cursor-pointer p-1 text-slate-500 hover:text-slate-900"
        ></i>
        <div className="flex flex-col gap-6 p-2 h-full overflow-y-auto">
          <h1 className="font-semibold text-lg lg:text-3xl">
            {modalObjectData.title}
          </h1>
          <p className="lg:text-lg">{modalObjectData.info}</p>
          <ul className="p-4 flex flex-col gap-2 lg:text-lg">
            {modalObjectData.bullets.map((bullet, index) => (
              <li className="list-disc" key={index}>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
});

export default WeatherConditionsInfoModal;
