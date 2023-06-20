import { createSlice } from "@reduxjs/toolkit";
import {
  calculateTotalPrice,
  calculateTotalQuantity,
} from "./helpers/cartHelpers";

export const cartSlice = createSlice({
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
    increaseQuantity: (state, action) => {
      const id_product = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id_product === id_product
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity += 1;
        state.totalQuantity = calculateTotalQuantity(state.cartItems);
        state.totalPrice = calculateTotalPrice(state.cartItems);
      }
    },
    decreaseQuantity: (state, action) => {
      const id_product = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id_product === id_product
      );
      if (itemIndex !== -1 && state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
        state.totalQuantity = calculateTotalQuantity(state.cartItems);
        state.totalPrice = calculateTotalPrice(state.cartItems);
      }
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id_product === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const {
  setCartItems,
  increaseQuantity,
  decreaseQuantity,
  updateCartItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
