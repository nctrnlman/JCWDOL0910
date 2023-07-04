import React, { useState } from "react";

function SearchInputList({ setSearchInput, onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    setSearchInput(inputValue);
    onSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="form-control flex flex-row lg:items-center relative gap-3 p-3">
      <div>
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-72 sm:w-96 lg:w-[600px] xl:w-[800px]"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>

      <div>
        <button
          className="btn btn-primary"
          onClick={handleSearch}
          aria-label="Search"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchInputList;
