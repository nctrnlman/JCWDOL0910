import React from "react";

const SearchInput = () => {
  return (
    <div className="form-control">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered w-40 sm:w-96 lg:w-[600px] xl:w-[800px]"
      />
    </div>
  );
};

export default SearchInput;
