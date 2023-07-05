import React from "react";
import SearchInputList from "../../utils/SearchInputList";

function SearchSection({ searchInput, setSearchInput, onSearch }) {
  return (
    <div className="p-2 mb-2 flex justify-center items-center">
      <SearchInputList
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={onSearch}
      />
    </div>
  );
}

export default SearchSection;
