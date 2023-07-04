import React, { useState } from "react";

function SearchInputList({ setSearchInput, onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    setSearchInput(inputValue);
    onSearch();
  };

  return (
    <div className="form-control flex flex-row lg:items-center relative">
      <div>
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-72 sm:w-96 lg:w-[600px] xl:w-[800px]"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
