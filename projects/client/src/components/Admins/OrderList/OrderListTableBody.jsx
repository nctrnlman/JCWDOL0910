import React from "react";
import { useSelector } from "react-redux";

function OrderListTableBody({ orders, currentPage }) {
  const itemsPerPage = useSelector(
    (state) => state.orderListAdmin.itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  function formatCurrency(amount) {
    return amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
  return (
    <tbody className="lg:text-lg">
      {orders.map((order, index) => (
        <tr key={order.id_order} className="hover">
          <th className="text-center">
            <td>{startIndex + index + 1}</td>
          </th>
          <td>Order: #{order.id_order}</td>
          <td>{order.email}</td>
          <td>{order.warehouse_name}</td>
          <td>{order.status}</td>
          <td>{order.remitter || "N/A"}</td>
          <td>{order.bank_name || "N/A"}</td>
          <td>{order.account_number || "N/A"}</td>
          <td>{formatCurrency(order.total_amount)}</td>
          <td className="relative">
            <div className="gap-5 grid grid-cols-1 items-center justify-center">
              <a
                href="#edit_modal"
                className="btn btn-xs w-12 lg:w-full btn-info lg:btn-sm"
              >
                Edit
              </a>
              <a
                className="btn btn-xs w-12 lg:w-full btn-error lg:btn-sm"
                href="#delete_modal"
              >
                Delete
              </a>
              <a
                href="#"
                className="btn btn-xs w-12 lg:w-full btn-primary lg:btn-sm"
              >
                See Receipt
              </a>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default OrderListTableBody;
