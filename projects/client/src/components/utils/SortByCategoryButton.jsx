import React from "react";

function SortByCategoryButton({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="flex space-x-2 pt-2">
      <label className="flex justify-center items-center">Category:</label>
      <select
        className="select select-bordered"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category.id_category} value={category.id_category}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortByCategoryButton;
