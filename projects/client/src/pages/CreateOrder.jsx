import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import CustomToast from "../components/CustomToast/CustomToast";
import CustomToastOptions from "../components/CustomToast/CustomToastOptions";
import AddressSelect from "../components/Order/AddressSelect";
import CartItem from "../components/Order/CartItem";
import ShippingMethodSelect from "../components/Order/ShippingMethodSelect";

const CreateOrder = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  const cartItems = useSelector((state) => state.carts.cartItems);
  const totalPrice = useSelector((state) => state.carts.totalPrice);
  const [shipping, setShipping] = useState(0);
  const [warehouse, setWarehouse] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  const id_user = user.id;
  let total_amount = totalPrice + parseInt(shipping);

  const formattedPrice = (price) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

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
      toast(
        <CustomToast type="error" message={error.response.data.message} />,
        CustomToastOptions
      );
    }
  };

  const fetchShipping = async (courier) => {
    try {
      setShipping(0);
      let response = await axios.get(
        `http://localhost:8000/api/orders/shipping-warehouse?id_user=${id_user}&courier=${courier}&id_address=${selectedAddress}`
      );
      const { service, warehouse } = response.data;
      setShippingOptions(service);
      setWarehouse(warehouse.id_warehouse);
    } catch (error) {
      toast(
        <CustomToast type="error" message={error.response.data.message} />,
        CustomToastOptions
      );
    }
  };

  const handleAddressChange = (e) => {
    const addressId = e.target.value;
    setSelectedAddress(addressId);
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

  const handleShippingChange = (e) => {
    const shippingValue = e.target.value;
    setShipping(shippingValue);
  };

  useEffect(() => {
    if (shippingMethod !== "") {
      fetchShipping(shippingMethod);
    }
  }, [shippingMethod]);

  const navigateToProfile = () => {
    navigate("/profiling");
  };

  return (
    <div className="h-screen">
      <div className="flex flex-col pt-20 p-10 gap-3">
        <AddressSelect
          selectedAddress={selectedAddress}
          handleAddressChange={handleAddressChange}
          navigateToProfile={navigateToProfile}
        />

        {cartItems.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}

        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between gap-2 ">
          <h1 className="text-xl font-bold mb-2">Shipping Method</h1>
          <ShippingMethodSelect
            shippingMethod={shippingMethod}
            shippingOptions={shippingOptions}
            handleShippingMethodChange={handleShippingMethodChange}
            shipping={shipping}
            handleShippingChange={handleShippingChange}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          {cartItems.map((item) => (
            <div className="flex gap-2 justify-between pb-2 ">
              <div className="flex gap-2">
                <h3 className="font-bold">{item.name}</h3>
                <h3 className="">x</h3>
                <h3 className="">{item.quantity}</h3>
              </div>
              <p>{formattedPrice(item.price * item.quantity)}</p>
            </div>
          ))}
          <div className="flex justify-between pb-2">
            <h1 className="font-bold">Shipping</h1>
            <p>{formattedPrice(parseInt(shipping))}</p>
          </div>
          <div className="border-t border-gray-300 pt-4 mb-4 flex justify-between">
            <h1 className="font-bold text-xl">Total Price</h1>
            <p>{formattedPrice(total_amount)}</p>
          </div>
        </div>

        <div>
          <button
            className="btn btn-primary w-full"
            onClick={handleSubmit}
            disabled={
              isLoading || shippingMethod === "" || selectedAddress === ""
            }
          >
            {isLoading ? "Processing" : "Create Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
