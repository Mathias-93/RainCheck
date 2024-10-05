import SideBar from "./components/SideBar";
import { useState, useEffect } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  return (
    <>
      <div
        id="project-wrapper"
        className="min-h-screen flex justify-center dark:bg-slate-900 bg-gray-100 transition-colors duration-300"
      >
        <div
          id="main-container"
          className="p-4 w-[80%] dark:bg-slate-700 bg-sky-200 shadow-lg rounded-lg flex flex-col gap-5 my-5 transition-colors duration-300"
        >
          <SideBar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        </div>
      </div>
    </>
  );
}

export default App;
