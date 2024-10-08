import React from "react";

export default function SearchBar(props) {
  const {
    setLocation,
    handleSubmit,
    inputValue,
    setInputValue,
    handleInputChange,
  } = props;
  return (
    <>
      <form className="flex gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleInputChange}
          className="w-[500px] h-[50px] ml-[100px] rounded p-4 bg-gray-100 dark:bg-slate-500 shadow-lg transition-colors duration-300 dark:text-gray-100 text-slate-700"
        />
        <button
          type="submit"
          className="border rounded p-3 bg-gray-100 dark:bg-slate-500 dark:text-gray-100 shadow-lg transition-colors duration-300 text-slate-700"
        >
          Find Location
        </button>
      </form>
    </>
  );
}
