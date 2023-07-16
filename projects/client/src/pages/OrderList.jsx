import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, fetchOrder } from "../features/orders/orderSlice";
import OrderItem from "../components/Order/OrderItem";
import Pagination from "../components/utils/Pagination";

function OrderList() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("Menunggu Pembayaran");
  const orderList = useSelector((state) => state.orders.orderList);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const user = useSelector((state) => state.users.user);
  const currentPage = useSelector((state) => state.orders.currentPage);
  const totalPages = useSelector((state) => state.orders.totalPages);
  const itemsPerPage = useSelector((state) => state.orders.itemsPerPage);
  const id_user = user.id;

  const formattedPrice = (price) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const handleShowReceipt = (orderId, selectedOrder) => {
    setSelectedOrderId(orderId);
    setSelectedOrder(selectedOrder);
  };

  const handleShowCancelModal = (orderId, selectedOrder) => {
    setSelectedOrderId(orderId);
    setSelectedOrder(selectedOrder);
  };

  const handleCancelOrder = () => {
    setStatus("Dibatalkan");
    dispatch(cancelOrder(selectedOrderId, id_user, status));
  };

  const isWaitingPayment = (order) => {
    return order.status === "Menunggu Pembayaran";
  };

  const isWaitingConfirmOrder = (order) => {
    return order.status === "Menunggu Konfirmasi Pembayaran";
  };

  const renderOrder = () => {
    if (orderList.length === 0) {
      return (
        <div className="min-h-[50px] flex flex-col">
          <div className="bg-base-100 mb-4 rounded-lg shadow-lg p-4">
            <h1 className="text-2xl">Order with the status does not exist</h1>
          </div>
        </div>
      );
    }

    return orderList.map((order) => (
      <OrderItem
        key={order.id_order}
        order={order}
        formattedPrice={formattedPrice}
        handleShowReceipt={handleShowReceipt}
        handleShowCancelModal={handleShowCancelModal}
        handleCancelOrder={handleCancelOrder}
        isWaitingPayment={isWaitingPayment(order)}
        isWaitingConfirmOrder={isWaitingConfirmOrder(order)}
        selectedOrderId={selectedOrderId}
        selectedOrder={selectedOrder}
      />
    ));
  };

  const handlePageChange = (page) => {
    dispatch(fetchOrder(id_user, status, page));
  };

  useEffect(() => {
    dispatch(fetchOrder(id_user, status, currentPage));
  }, [dispatch, status, id_user, currentPage]);

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col pt-20 p-10 gap-3">
        <div className="flex items-center">
          <h1 className="lg:text-xl">Status:</h1>
          <select
            className="select select-bordered w-[300px] lg:w-[400px] max-w-xs ml-4 text-xs lg:text-base"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
            <option value="Menunggu Konfirmasi Pembayaran">
              Menunggu Konfirmasi Pembayaran
            </option>
            <option value="Diproses">Diproses</option>
            <option value="Dikirim">Dikirim</option>
            <option value="Pesanan Dikonfirmasi">Pesanan Dikonfirmasi</option>
            <option value="Dibatalkan">Dibatalkan</option>
          </select>
        </div>
        {renderOrder()}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default OrderList;
