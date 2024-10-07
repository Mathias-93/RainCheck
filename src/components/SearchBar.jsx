import React from "react";

export default function SearchBar() {
  return (
    <>
      <div className="flex gap-3">
        <input
          type="text"
          className="w-[500px] h-[50px] ml-[100px] rounded p-4 bg-gray-100 dark:bg-slate-500 shadow-lg"
        />
        <button className="border rounded p-3 bg-gray-100 dark:bg-slate-500 shadow-lg">
          Find Location
        </button>
      </div>
    </>
  );
}
