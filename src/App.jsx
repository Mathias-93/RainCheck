import SideBar from "./components/SideBar";

function App() {
  return (
    <>
      <div
        id="project-wrapper"
        className="min-h-screen flex justify-center bg-sky-200"
      >
        <div
          id="main-container"
          className="p-4 w-[80%] bg-sky-300 shadow-lg rounded-lg flex flex-col gap-5 my-5"
        >
          <SideBar />
        </div>
      </div>
    </>
  );
}

export default App;
