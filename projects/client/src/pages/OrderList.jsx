import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../features/orders/orderSlice";
import PaymentButton from "../components/Buttons/PaymentButton";

function OrderList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("Menunggu Pembayaran");
  const orderList = useSelector((state) => state.orders.orderList);
  const user = useSelector((state) => state.users.user);
  const id_user = user.id;
  const renderOrder = () => {
    return orderList?.map((order) => {
      return (
        <div className="min-h-[50px] flex flex-col">
          <div className="bg-base-100 mb-4 rounded-lg shadow-lg p-4 ">
            <h1 className="font-bold text-2xl">Order: #{order.id_order}</h1>
            <h1>Shipping : {order.shipping_method}</h1>
            {order.productList.map((product) => (
              <div
                key={product.product_name}
                className="hero-content justify-start lg:w-[400px] flex items-center"
              >
                <img
                  src={`http://localhost:8000/${product.product_image}`}
                  alt={product.product_name}
                  className="w-[100px] lg:w-[100px] rounded-lg shadow-2xl"
                />
                <div className="flex flex-col ml-4">
                  <h1 className="text-base uppercase lg:text-3xl font-bold">
                    {product.product_name}
                  </h1>
                  <p>x {product.quantity}</p>
                  <p>Rp.{product.quantity * product.product_price}</p>
                </div>
              </div>
            ))}
            <div className="flex justify-between text-xl">
              <div>
                <p>Total Amount : {order.total_amount}</p>
              </div>
              <div className="flex gap-2">
                <PaymentButton orderId={order.id_order} />
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    dispatch(fetchOrder(id_user, status));
  }, [status]);

  return (
    <div className=" w-screen h-screen ">
      <div className="flex flex-col pt-20 p-10 gap-3">
        <div className="flex items-center ">
          <h1 className="lg:text-xl">Status : </h1>
          <select
            className="select select-bordered w-[200px] lg:w-[400px] max-w-xs ml-4 text-xs lg:text-base"
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
    </div>
  );
}

export default OrderList;
