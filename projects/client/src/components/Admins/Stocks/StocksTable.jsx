import React from "react";
import StocksTableBody from "./StocksTableBody";

function StocksTable({
  stockProducts,
  currentPage,
  openDeleteModal,
  openEditModal,
}) {
  return (
    <table className="table table-zebra  text-black bg-primary h-3/4 lg:h-full lg:max-h-fit w-full lg:w-screen lg:max-w-screen-xl">
      {/* head */}
      <thead className="sticky top-0">
        <tr className="bg-base-300 text-base-content lg:text-lg">
          <th></th>
          <th>Product Name</th>
          <th>Warehosue</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      {/* body */}
      <StocksTableBody
        stockProducts={stockProducts}
        currentPage={currentPage}
        openDeleteModal={openDeleteModal}
        openEditModal={openEditModal}
      />
      <tfoot className="sticky bottom-0 lg:text-lg">
        <tr className="bg-base-300 text-base-content">
          <th></th>
          <th>Product Name</th>
          <th>Warehosue</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </tfoot>
    </table>
  );
}

export default StocksTable;
