import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import CustomToast from "../components/CustomToast/CustomToast";
import CustomToastOptions from "../components/CustomToast/CustomToastOptions";

const CreateOrder = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  const cartItems = useSelector((state) => state.carts.cartItems);
  const totalPrice = useSelector((state) => state.carts.totalPrice);
  const [shipping, setShipping] = useState(0);
  const [address, setAddress] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shippingOptions, setShippingOptions] = useState([]);

  const id_user = user.id;
  const total_amount = totalPrice + parseInt(shipping);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const orderData = {
        id_user,
        id_warehouse: warehouse,
        total_amount,
        shipping_method: shippingMethod,
        productList: cartItems.map((item) => ({
          productName: item.name,
          productPrice: item.price,
          productImage: item.image_url,
          quantity: item.quantity,
        })),
      };
      let response = await axios.post(
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
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const fetchShipping = async (courier) => {
    try {
      setShipping(0);
      let response = await axios.get(
        `http://localhost:8000/api/orders/shipping-warehouse?id_user=${id_user}&courier=${courier}`
      );

      const { service, address, warehouse } = response.data;

      setShippingOptions(service);
      setAddress(address.address);
      setWarehouse(warehouse.id_warehouse);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShippingMethodChange = (e) => {
    const method = e.target.value;
    if (method === "") {
      setShipping(0);
      setShippingMethod("");
      setShippingOptions([]);
    } else {
      setShippingMethod(method);
    }
  };

  useEffect(() => {
    if (shippingMethod !== "") {
      fetchShipping(shippingMethod);
    }
  }, [shippingMethod]);

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col pt-20 p-10 gap-3">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h1 className="text-xl font-bold mb-2">Address</h1>
          <p>{address}</p>
        </div>
        {cartItems.map((item, index) => (
          <div key={index} className="min-h-[50px] flex flex-col">
            <div className="bg-base-100 mb-4 rounded-lg shadow-lg p-4">
              <div className="hero-content justify-start lg:w-[400px]">
                <img
                  src={`http://localhost:8000/${item.image_url}`}
                  alt="item cart"
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
        ))}
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold mb-2">Shipping Method</h1>
          <div className="flex gap-4">
            <div>
              <h1 className="py-2">Courier :</h1>
              <select
                className="select select-bordered w-full max-w-xs"
                value={shippingMethod}
                onChange={handleShippingMethodChange}
              >
                <option value="">None</option>
                <option value="JNE">JNE</option>
                <option value="POS">POS</option>
                <option value="TIKI">TIKI</option>
              </select>
            </div>
            <div>
              <h1 className="py-2">Service :</h1>
              <select
                className="select select-bordered w-[350px] max-w-xs "
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
                disabled={shippingMethod === ""}
              >
                <option value="">None</option>
                {shippingOptions.map((option) => (
                  <option key={option.service} value={option.cost[0].value}>
                    {option.service} - Harga: {option.cost[0].value} - Estimasi
                    waktu: {option.cost[0].etd}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 p-4">
          {cartItems.map((item) => (
            <div className="flex gap-2 justify-between pb-2 ">
              <div className="flex gap-2">
                <h3 className="font-bold">{item.name}</h3>
                <h3 className="font-bold">x</h3>
                <h3 className="font-bold">{item.quantity}</h3>
              </div>
              <p>{item.price * item.quantity}</p>
            </div>
          ))}
          <div className="flex justify-between pb-2">
            <h1 className="font-bold">Shipping</h1>
            <p>{shipping}</p>
          </div>
          <div className="border-t border-gray-300 pt-4 mb-4 flex justify-between">
            <h1 className="font-bold text-xl">Total Price</h1>
            <p>{total_amount}</p>
          </div>
        </div>
        <div>
          <button
            className="btn btn-primary w-full"
            onClick={handleSubmit}
            disabled={isLoading || shippingMethod === ""}
          >
            {isLoading ? "Processing" : "Create Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
