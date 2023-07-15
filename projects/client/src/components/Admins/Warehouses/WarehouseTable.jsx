import React from "react";
import WarehouseTableBody from "./WarehouseTableBody";

const WarehouseTable = ({
  warehouses,
  currentPage,
  openDeleteModal,
  openEditModal,
}) => {
  return (
    <table className="table table-zebra  text-black bg-primary h-3/4 lg:h-auto lg:max-h-fit w-full lg:w-screen lg:max-w-screen-xl">
      {/* head */}
      <thead className="sticky top-0">
        <tr className="bg-base-300 text-base-content lg:text-lg">
          <th>No</th>
          <th>Name</th>
          <th>Address</th>
          <th>District</th>
          <th>City</th>
          <th>Province</th>
          <th>Postal Code</th>
          <th>Actions</th>
        </tr>
      </thead>
      {/* body */}
      <WarehouseTableBody
        warehouses={warehouses}
        currentPage={currentPage}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />
      <tfoot className="sticky bottom-0 lg:text-lg">
        <tr className="bg-base-300 text-base-content">
          <th>No</th>
          <th>Name</th>
          <th>Address</th>
          <th>District</th>
          <th>City</th>
          <th>Province</th>
          <th>Postal Code</th>
          <th>Actions</th>
        </tr>
      </tfoot>
    </table>
  );
};

export default WarehouseTable;
