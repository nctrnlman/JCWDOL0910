import React from "react";
import OrderListTableBody from "./OrderListTableBody";

function OrderListTable({ orders, currentPage, setId }) {
  return (
    <table className="table table-zebra text-black bg-base-100 shadow-xl h-3/4 lg:h-full lg:max-h-fit w-full lg:w-screen lg:max-w-screen-xl">
      {/* head */}
      <thead className="sticky top-0">
        <tr className="bg-base-300 text-base-content lg:text-lg">
          <th></th>
          <th>Nomor Order</th>
          <th>Email User</th>
          <th>Warehosue</th>
          <th>Status</th>
          <th>Remitter</th>
          <th>Bank</th>
          <th>Account Number</th>
          <th>Total Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      {/* body */}
      <OrderListTableBody
        orders={orders}
        currentPage={currentPage}
        setId={setId}
      />
      <tfoot className="sticky bottom-0 lg:text-lg">
        <tr className="bg-base-300 text-base-content">
          <th></th>
          <th>Nomor Order</th>
          <th>Email User</th>
          <th>Warehosue</th>
          <th>Status</th>
          <th>Remitter</th>
          <th>Bank</th>
          <th>Account Number</th>
          <th>Total Amount</th>
          <th>Actions</th>
        </tr>
      </tfoot>
    </table>
  );
}

export default OrderListTable;
