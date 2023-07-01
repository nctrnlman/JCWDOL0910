import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";
import CustomToast from "../components/CustomToast/CustomToast";
import { toast } from "react-toastify";
import CustomToastOptions from "../components/CustomToast/CustomToastOptions";

function CreateOrder() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  const cartItems = useSelector((state) => state.carts.cartItems);
  const totalPrice = useSelector((state) => state.carts.totalPrice);
  const [shipping, setShipping] = useState("");
  const [address, setAddress] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [paymentProof, setPaymentProof] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const id_user = user.id;
  const total_amount = totalPrice + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        id_user: id_user,
        id_warehouse: warehouse,
        total_amount: total_amount,
        shipping_method: shippingMethod,
        payment_proof: paymentProof,
        productList: cartItems.map((item) => ({
          productName: item.name,
          productPrice: item.price,
          productImage: item.image_url,
          quantity: item.quantity,
        })),
      };
      let response = await Axios.post(
        "http://localhost:8000/api/orders/create",
        orderData
      );

      if (response.data.success) {
        toast(
          <CustomToast type="success" message={response.data.message} />,
          CustomToastOptions
        );
        navigate("/orders");
      }
    } catch (error) {
      toast(
        <CustomToast type="error" message={error.response.data.message} />,
        CustomToastOptions
      );
      console.log(error);
    }
  };

  const fetchShipping = async () => {
    try {
      let response = await Axios.get(
        `http://localhost:8000/api/orders/shipping-warehouse?id_user=${id_user}`
      );

      const { shipping, address, warehouse } = response.data;
      setShipping(shipping);
      setAddress(address.address);
      setWarehouse(warehouse.id_warehouse);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const renderOrder = () => {
    return cartItems.map((item, index) => {
      return (
        <div key={index} className="min-h-[50px] flex flex-col">
          <div className="bg-base-100 mb-4 rounded-lg shadow-lg p-4">
            <div className="hero-content justify-start lg:w-[400px]">
              <img
                src={item.image_url}
                className="w-[100px] lg:w-[100px] rounded-lg shadow-2xl"
              />
              <div>
                <h1 className="text-base uppercase lg:text-3xl font-bold">
                  {item.name}
                </h1>
                <p className="py-2">Desc: {item.description}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    fetchShipping();
  }, []);

  const renderPrices = () => {
    return cartItems.map((item) => {
      return (
        <div className="flex gap-2 justify-between pb-2 ">
          <div className="flex gap-2">
            <h3 className="font-bold">{item.name}</h3>
            <h3 className="font-bold">x</h3>
            <h3 className="font-bold">{item.quantity}</h3>
          </div>
          <p>
            {isLoading ? (
              <progress className="progress w-20"></progress>
            ) : (
              item.price * item.quantity
            )}
          </p>
        </div>
      );
    });
  };

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col pt-20 p-10 gap-3">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h1 className="text-xl font-bold mb-2">Address</h1>
          <p>
            {isLoading ? (
              <progress className="progress w-56"></progress>
            ) : (
              address
            )}
          </p>
        </div>
        <div>{renderOrder()}</div>
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold mb-2">Shipping Method</h1>
          <select
            className="select select-bordered w-full max-w-xs"
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
          >
            <option>None</option>
            <option>JNE</option>
            <option>POS</option>
            <option>TIKI</option>
          </select>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold mb-2">Payment Proof</h1>
          <select
            className="select select-bordered w-full max-w-xs"
            value={paymentProof}
            onChange={(e) => setPaymentProof(e.target.value)}
          >
            <option>None</option>
            <option>BCA</option>
            <option>Mandiri</option>
          </select>
        </div>
        <div className="border border-gray-300 p-4">
          {renderPrices()}
          <div className="flex justify-between pb-2">
            <h1 className="font-bold">Shipping</h1>
            <p>
              {isLoading ? (
                <progress className="progress w-56"></progress>
              ) : (
                shipping
              )}
            </p>
          </div>
          <div className="border-t border-gray-300 pt-4 mb-4 flex justify-between">
            <h1 className="font-bold text-xl">Total Price</h1>
            <p>
              {isLoading ? (
                <progress className="progress w-56"></progress>
              ) : (
                total_amount
              )}
            </p>
          </div>
        </div>
        <button
          className="btn btn-primary btn-sm sm:btn-sm md:btn-md lg:btn-lg"
          onClick={handleSubmit}
        >
          Create Order
        </button>
      </div>
    </div>
  );
}

export default CreateOrder;
