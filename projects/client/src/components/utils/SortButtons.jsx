import React, { useState } from "react";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { BsSortNumericDown, BsSortNumericUp } from "react-icons/bs";

const SortButtons = ({ handleSort }) => {
  const [selectedSort, setSelectedSort] = useState("");

  const handleSortChange = (option) => {
    setSelectedSort(option);
    handleSort(option);
  };

  return (
    <div className="flex space-x-2 pt-2">
      <label className="flex justify-center items-center">Sort By:</label>
      <select
        className="select select-bordered"
        value={selectedSort}
        onChange={(e) => handleSortChange(e.target.value)}
      >
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
        {window.location.pathname === "/admin-products" ? (
          <>
            <option value="highest">Highest Price</option>
            <option value="lowest">Lowest Price</option>
          </>
        ) : (
          <>
            <option value="highest">Highest Stock</option>
            <option value="lowest">Lowest Stock</option>
            <option value="warehouse-asc">Warehouse A-Z</option>
            <option value="warehouse-desc">Warehouse Z-A</option>
          </>
        )}
      </select>
    </div>
  );
};

export default SortButtons;
