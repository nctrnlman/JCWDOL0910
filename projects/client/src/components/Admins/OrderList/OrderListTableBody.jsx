import React from "react";
import { useSelector } from "react-redux";
import PaymentConfirmationButton from "../../Buttons/PaymentConfirmationButton";
import SeeReceiptButton from "../../Buttons/SeeReceiptButton";
import SendOrderButton from "../../Buttons/SendOrderButton";
import CancelOrderButtonAdmin from "../../Buttons/CancelOrderButtonAdmin";

function OrderListTableBody({
  orders,
  currentPage,
  setSelectedId,
  handleShowReceipt,
}) {
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
    <>
      <tbody className="lg:text-lg">
        {orders.length === 0 ? (
          <tr>
            <td colSpan="8" className="text-center">
              No data available.
            </td>
          </tr>
        ) : (
          orders.map((order, index) => (
            <tr key={order.id_order} className="hover">
              <th className="text-center">{startIndex + index + 1}</th>
              <td>Order: #{order.id_order}</td>
              <td>{order.email}</td>
              <td>{order.warehouse_name}</td>
              <td className="font-bold italic">{order.status}</td>
              <td>
                <SeeReceiptButton
                  onClick={() => handleShowReceipt(order.id_order, order)}
                />
              </td>
              <td>{formatCurrency(order.total_amount)}</td>
              <td className="relative">
                <div className="gap-5 grid grid-cols-1 items-center justify-center">
                  <PaymentConfirmationButton
                    setSelectedId={setSelectedId}
                    id_order={order.id_order}
                    status={order.status}
                  />
                </div>
                <div className="gap-5 grid grid-cols-1 items-center justify-center p-2">
                  <SendOrderButton
                    setSelectedId={setSelectedId}
                    id_order={order.id_order}
                    status={order.status}
                  />
                </div>

                <div className="gap-5 grid grid-cols-1 items-center justify-center p-2">
                  <CancelOrderButtonAdmin
                    setSelectedId={setSelectedId}
                    id_order={order.id_order}
                    status={order.status}
                  />
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </>
  );
}

export default OrderListTableBody;
