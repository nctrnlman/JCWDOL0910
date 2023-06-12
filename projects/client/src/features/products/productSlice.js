import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    latest_products: [],
    cartItems: [],
    totalPrice: 0,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setLatestProducts: (state, action) => {
      state.latest_products = action.payload;
    },
    setCartItems: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id_product === newItem.id_product
      );

      if (existingItemIndex !== -1) {
        if (
          newItem.quantity < 0 &&
          state.cartItems[existingItemIndex].quantity === 1
        ) {
          // Remove item from cart
          state.cartItems.splice(existingItemIndex, 1);
        } else {
          // Update quantity if item exists in cart
          state.cartItems[existingItemIndex].quantity += newItem.quantity;
        }
      } else {
        // Add new item to cart
        state.cartItems.push(newItem);
      }

      // Update total price
      state.totalPrice = state.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },

    removeFromCart: (state, action) => {
      const id_product = action.payload;

      // Find the index of the item to remove
      const indexToRemove = state.cartItems.findIndex(
        (item) => item.id_product === id_product
      );

      if (indexToRemove !== -1) {
        // Remove the item from the cart
        state.cartItems.splice(indexToRemove, 1);
      }

      // Update total price
      state.totalPrice = state.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  setProducts,
  setLatestProducts,
  setCartItems,
  removeFromCart,
  clearCart,
} = productSlice.actions;

export default productSlice.reducer;

export function fetchProducts() {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:8000/products/");
      dispatch(setProducts(response.data));
      console.log(response, "productSlice");
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };
}

export function getLatestProducts() {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        "http://localhost:8000/products/latest_products"
      );
      console.log("latest_products");
      console.log(response.data, "latest products");
      dispatch(setLatestProducts(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function addCartItem(product, quantity) {
  return async (dispatch) => {
    try {
      const { id_product, name, price, id_category, image_url } = product;
      dispatch(
        setCartItems({
          id_product,
          name,
          price,
          id_category,
          image_url,
          quantity,
        })
      );
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };
}

export function removeCartItem(id_product) {
  return async (dispatch) => {
    try {
      dispatch(removeFromCart(id_product));
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };
}
