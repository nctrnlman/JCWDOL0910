import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../features/orders/orderSlice";
import { useParams } from "react-router-dom";
import UploadReceiptModal from "../components/modals/UploadReceiptModal";
import PaymentConfirmationCard from "../components/PaymentConfirmationCard";

function Payment() {
  const { id } = useParams();
  const orders = useSelector((state) => state.orders.orderList);
  const user = useSelector((state) => state.users.user);
  const [status, setStatus] = useState("Menunggu Pembayaran");
  const [isChecked, setIsChecked] = useState(false);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrder(user.id, status));
  }, [status]);

  const order = orders.find((order) => order.id_order === parseInt(id));
  const totalPrice = order ? order.total_amount : 0;
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(totalPrice)
    .replace(",00", "");

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const openUploadModal = () => {
    setUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setUploadModalOpen(false);
  };

  return (
    <div className="bg-base-200 w-full h-full lg:w-screen lg:h-screen flex justify-center items-center pt-16">
      {order && (
        <PaymentConfirmationCard
          order={order}
          formattedPrice={formattedPrice}
          isChecked={isChecked}
          handleCheckboxChange={handleCheckboxChange}
          openUploadModal={openUploadModal}
        />
      )}
      {isUploadModalOpen && (
        <UploadReceiptModal
          closeModal={closeUploadModal}
          orderId={id}
          orders={orders}
        />
      )}
    </div>
  );
}

export default Payment;
