import { setCartItems, increaseQuantity, decreaseQuantity } from "./cartSlice";
import axios from "axios";

export function addToCart(id_product, quantity, cartItems) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user_token");
      const response = await axios.post(
        "http://localhost:8000/carts",
        {
          id_product,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { message, product, quantity: updatedQuantity } = response.data;

      // Check if the product already exists in the cart
      const existingProductIndex = cartItems.findIndex(
        (item) => item.id_product === product.id_product
      );
      if (existingProductIndex !== -1) {
        // Get the existing cart item
        const existingCartItem = cartItems[existingProductIndex];
        if (existingCartItem.quantity === updatedQuantity) {
          // Quantity is already up-to-date, no need to update Redux
          console.log("Quantity is already up-to-date");
          return;
        }
        // Create a new object with updated quantity
        const updatedCartItem = {
          ...existingCartItem,
          quantity: updatedQuantity,
        };
        // Create a new array with the updated cart item
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingProductIndex] = updatedCartItem;
        dispatch(setCartItems(updatedCartItems));
      } else {
        // Add the product to the cart
        const newCartItem = { ...product, quantity: updatedQuantity };
        dispatch(setCartItems([...cartItems, newCartItem]));
      }
      console.log(message);
    } catch (error) {
      console.error("Error adding product to cart: ", error);
      toast(
        <CustomToast type="error" message={error.response.data.message} />,
        CustomToastOptions
      );
    }
  };
}

export function fetchItemsCart() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user_token");
      const response = await axios.get("http://localhost:8000/carts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { message, cartItems } = response.data;
      dispatch(setCartItems(cartItems));
      console.log(message);
    } catch (error) {
      console.error("Error fetching cart items: ", error);
    }
  };
}
export function increaseCartItemQuantity(id_product) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user_token");
      await axios.put("http://localhost:8000/carts/increase-qty", null, {
        params: {
          id_product,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(increaseQuantity({ id_product }));
    } catch (error) {
      console.error("Error increasing quantity: ", error);
      toast(
        <CustomToast type="error" message={error.response.data.message} />,
        CustomToastOptions
      );
    }
  };
}

export function decreaseCartItemQuantity(id_product) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user_token");
      await axios.put("http://localhost:8000/carts/decrease-qty", null, {
        params: {
          id_product,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(decreaseQuantity({ id_product }));
    } catch (error) {
      console.error("Error decreasing quantity: ", error);
      toast(
        <CustomToast type="error" message={error.response.data.message} />,
        CustomToastOptions
      );
    }
  };
}
