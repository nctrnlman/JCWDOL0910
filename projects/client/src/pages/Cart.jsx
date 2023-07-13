import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItemQuantity } from "../features/carts/helpers/cartHelpers";
import CartContent from "../components/Cart/CartContent";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.carts.cartItems);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleQuantityChange = (productId, newQuantity, priceDifference) => {
    dispatch(updateCartItemQuantity({ id: productId, quantity: newQuantity }));
    setTotalPrice((prevTotalPrice) => prevTotalPrice + priceDifference);
  };

  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(totalPrice);
  }, [cartItems]);

  return (
    <div className="h-screen flex flex-col bg-base-100 lg:pt-20 pt-16">
      <CartContent
        cartItems={cartItems}
        onQuantityChange={handleQuantityChange}
        totalPrice={totalPrice}
      />
    </div>
  );
}

export default Cart;
