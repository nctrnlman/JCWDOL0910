import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to calculate the total price
const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};
// Helper function to calculate the total quantity
const calculateTotalQuantity = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

export const productSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.totalQuantity = calculateTotalQuantity(action.payload);
      state.totalPrice = calculateTotalPrice(action.payload);
    },
  },
});

export const { setCartItems } = productSlice.actions;

export default productSlice.reducer;

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
    }
  };
}

export function fetchItemsCart() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user_token");
      const response = await axios.get("http://localhost:8000/carts/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { message, cartItems } = response.data;
      dispatch(setCartItems(cartItems));
    } catch (error) {
      console.error("Error fetching cart items: ", error);
    }
  };
}
