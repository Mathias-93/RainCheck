import React, { useContext } from "react";
import DarkMode from "./DarkMode";
import { GlobalContext } from "../Context";

export default function SideBar() {
  const { toggleDarkMode, isDarkMode } = useContext(GlobalContext);

  return (
    <>
      {/* {" "}
      <DarkMode toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} /> */}
    </>
  );
}

{
  /* <div
      className="flex flex-col w-[150px] p-2 gap-10 rounded shadow-lg 
        dark:bg-slate-500 text-gray-200  bg-sky-200 transition-colors duration-300"
    ></div> */
}
