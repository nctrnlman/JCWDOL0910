import React from "react";

function SearchInputList({ searchInput, setSearchInput, handleSearch }) {
  return (
    <div className="form-control flex flex-row items-center">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered w-40 sm:w-96 lg:w-[600px] xl:w-[800px]"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button className="btn btn-primary ml-2" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchInputList;
