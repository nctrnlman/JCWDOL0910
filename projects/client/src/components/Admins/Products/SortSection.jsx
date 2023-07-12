import React from "react";
import SortButtons from "../../utils/SortButtons";
import SortByCategoryButton from "../../utils/SortByCategoryButton";

function SortSection({
  categories,
  selectedCategory,
  setSelectedCategory,
  handleSort,
}) {
  return (
    <div className="flex lg:flex-row flex-col gap-5 lg:justify-center lg:items-center">
      <SortButtons handleSort={handleSort} />
      <SortByCategoryButton
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}

export default SortSection;
