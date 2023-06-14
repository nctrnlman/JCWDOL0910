import { toast } from "react-toastify";
import CustomToast from "../../../components/CustomToast/CustomToast";
import CustomToastOptions from "../../../components/CustomToast/CustomToastOptions";

export function isProductInCart(cartItems, product) {
  return cartItems.some((item) => item.id_product === product.id_product);
}

export function updateCartItemQuantity(cartItems, product, updatedQuantity) {
  return cartItems.map((item) =>
    item.id_product === product.id_product
      ? { ...item, quantity: updatedQuantity }
      : item
  );
}

export function showCartErrorToast(errorMessage) {
  toast(
    <CustomToast type="error" message={errorMessage} />,
    CustomToastOptions
  );
}

export function calculateTotalPrice(cartItems) {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

export function calculateTotalQuantity(cartItems) {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}
