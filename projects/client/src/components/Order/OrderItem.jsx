import React from "react";
import PaymentButton from "../Buttons/PaymentButton";
import SeeReceiptButton from "../Buttons/SeeReceiptButton";
import ReceiptModal from "../modals/ReceiptModal";
import CancelOrderButton from "../Buttons/CancelOrderButton";
import CancelOrderModal from "../modals/CancelOrderModal";

const OrderItem = ({
  order,
  formattedPrice,
  handleShowReceipt,
  handleShowCancelModal,
  handleCancelOrder,
  isWaitingPayment,
  isWaitingConfirmOrder,
  selectedOrderId,
  selectedOrder,
}) => {
  const formattedDate = new Date(order.created_at).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-[50px] flex flex-col" key={order.id_order}>
      <div className="bg-base-100 mb-4 rounded-lg shadow-lg p-4">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">Order #{order.id_order}</h1>
          <h1>{formattedDate}</h1>
        </div>
        {order.productList.map((product) => (
          <div
            key={product.product_name}
            className="hero-content justify-start lg:w-[1250px] flex items-center"
          >
            <img
              src={`http://localhost:8000/${product.product_image}`}
              alt={product.product_name}
              className="w-[100px] lg:w-[100px] rounded-lg shadow-2xl"
            />
            <div className="flex flex-col ml-4 w-[600px] lg:w-[1250px]">
              <div className="flex flex-row justify-between items-center gap-4">
                <div>
                  <h1 className="text-base uppercase lg:text-3xl font-bold">
                    {product.product_name}
                  </h1>
                  <p className="lg:text-base">x {product.quantity}</p>
                </div>
                <p className="text-base lg:text-lg">
                  {formattedPrice(product.quantity * product.product_price)}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between text-xl mt-3">
          <p className="text-[17px] lg:text-xl">
            Total Amount: {formattedPrice(order.total_amount)}
          </p>
          <div className="flex gap-2">
            {isWaitingPayment && <PaymentButton orderId={order.id_order} />}
            {isWaitingPayment && (
              <CancelOrderButton
                onClick={() => handleShowCancelModal(order.id_order, order)}
              />
            )}
            {isWaitingConfirmOrder && (
              <SeeReceiptButton
                onClick={() => handleShowReceipt(order.id_order, order)}
              />
            )}
            {selectedOrderId && <ReceiptModal order={selectedOrder} />}
            {selectedOrderId && (
              <CancelOrderModal
                order={selectedOrder}
                onClick={handleCancelOrder}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
