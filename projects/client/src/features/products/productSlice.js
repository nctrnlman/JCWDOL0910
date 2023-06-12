import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    latest_products: [],
    cart: [],
    totalPrice: 0,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setLatestProducts: (state, action) => {
      state.latest_products = action.payload;
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find(
        (item) => item.id_product === newItem.id_product
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.cart.push(newItem);
      }

      // Update total price
      state.totalPrice = state.cart.reduce((total, item) => {
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
  addToCart,
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
      dispatch(
        addToCart({
          id_product: product.id_product,
          name: product.name,
          quantity: product.quantity,
          price: product.price,
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
