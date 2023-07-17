import React from "react";
import CategoriesTableBody from "./CategoriesTableBody";

function CategoriesTable({ categories, currentPage }) {
  return (
    <div>
      <table className="table table-zebra text-black bg-base-100 shadow-xl h-3/4 lg:h-full lg:max-h-fit w-full lg:w-screen lg:max-w-screen-xl">
        <thead className="sticky top-0">
          <tr className="bg-base-300 text-base-content lg:text-lg ">
            <th>No</th>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <CategoriesTableBody
          categories={categories}
          currentPage={currentPage}
        />
        <tfoot className="sticky bottom-0 lg:text-lg">
          <tr className="bg-base-300 text-base-content">
            <th>No</th>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default CategoriesTable;
