import { setCartItems, increaseQuantity, decreaseQuantity } from "./cartSlice";
import axios from "axios";
import {
  isProductInCart,
  updateCartItemQuantity,
  showCartErrorToast,
} from "./helpers/cartHelpers";
import {
  showErrorToast,
  showInfoToast,
} from "../../components/CustomToast/CustomNotification";

export function addToCart(id_product, quantity, cartItems) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user_token");
      const response = await axios.post(
        "http://localhost:8000/api/carts",
        { id_product, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { message, product, quantity: updatedQuantity } = response.data;

      if ((product.total_stock = updatedQuantity)) {
        const updatedCartItems = isProductInCart(cartItems, product)
          ? updateCartItemQuantity(cartItems, product, updatedQuantity)
          : [...cartItems, { ...product, quantity: updatedQuantity }];

        dispatch(setCartItems(updatedCartItems));
        showInfoToast(message);
      }
    } catch (error) {
      console.error("Error adding product to cart: ", error);
      showCartErrorToast(error.response.data.message);
    }
  };
}

export function fetchItemsCart() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user_token");
      const response = await axios.get("http://localhost:8000/api/carts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setCartItems(response.data.cartItems));
    } catch (error) {
      console.error("Error fetching cart items: ", error);
    }
  };
}
export function increaseCartItemQuantity(id_product) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user_token");
      await axios.put("http://localhost:8000/api/carts/update-quantity", null, {
        params: { id_product, action: "increase" },
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(increaseQuantity({ id_product }));
      dispatch(fetchItemsCart());
    } catch (error) {
      console.error("Error increasing quantity: ", error);
      showErrorToast(error.response.data.message);
    }
  };
}

export function decreaseCartItemQuantity(id_product) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user_token");
      await axios.put("http://localhost:8000/api/carts/update-quantity", null, {
        params: { id_product, action: "decrease" },
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(decreaseQuantity({ id_product }));
      dispatch(fetchItemsCart());
    } catch (error) {
      console.error("Error decreasing quantity: ", error);
    }
  };
}

export function deleteProductFromCart(id_product) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user_token");
      const response = await axios.delete("http://localhost:8000/api/carts", {
        headers: { Authorization: `Bearer ${token}` },
        params: { id_product },
      });
      dispatch(fetchItemsCart());
      showInfoToast(response.data.message);
    } catch (error) {
      console.error("Error deleting product from cart: ", error);
    }
  };
}
