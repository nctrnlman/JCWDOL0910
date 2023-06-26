import React from "react";
import { RxCross2 } from "react-icons/rx";

function SearchInputList({ searchInput, setSearchInput }) {
  const handleClearSearch = () => {
    setSearchInput("");
  };

  return (
    <div className="form-control flex flex-row lg:items-center relative">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered w-40 sm:w-96 lg:w-[600px] xl:w-[800px]"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {searchInput && (
        <button
          className="absolute left-32 lg:right-0 lg:top-0 h-full flex items-center px-2 text-gray-500 hover:text-gray-700"
          onClick={handleClearSearch}
          aria-label="Clear Search"
        >
          <RxCross2 />
        </button>
      )}
    </div>
  );
}

export default SearchInputList;
