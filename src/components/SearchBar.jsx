// HomebrewContent.js
import React from "react";

const SearchBar = () => {
  return (
    <div className="relative h-32 w-full flex flex-col items-center justify-center p-4">
      <div className="text-xl font-bold mb-2">Homebrew content</div>
      <div className="w-full max-w-lg">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 border border-gray-400 rounded"
        />
      </div>
    </div>
  );
};

export default SearchBar;
