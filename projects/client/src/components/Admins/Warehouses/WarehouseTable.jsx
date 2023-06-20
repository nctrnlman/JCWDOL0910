import React from "react";
import WarehouseTableBody from "./WarehouseTableBody";

const WarehouseTable = ({ warehouses, navigate, openDeleteModal }) => {
  return (
    <table className="table table-zebra table-pin-rows text-black bg-primary h-full max-h-fit lg:h-full lg:max-h-fit overflow-y-auto w-full lg:w-screen lg:max-w-screen-xl">
      {/* head */}
      <thead className="sticky top-0">
        <tr className="bg-base-300 text-base-content">
          <th></th>
          <th>Name</th>
          <th>Address</th>
          <th>District</th>
          <th>City</th>
          <th>Province</th>
          <th>Actions</th>
        </tr>
      </thead>
      {/* body */}
      <WarehouseTableBody
        warehouses={warehouses}
        navigate={navigate}
        openDeleteModal={openDeleteModal}
      />
      <tfoot className="sticky bottom-0">
        <tr className="bg-base-300 text-base-content">
          <th></th>
          <th>Name</th>
          <th>Address</th>
          <th>District</th>
          <th>City</th>
          <th>Province</th>
          <th>Actions</th>
        </tr>
      </tfoot>
    </table>
  );
};

export default WarehouseTable;
