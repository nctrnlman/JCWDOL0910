import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    productList: [],
    product: {
      id: 0,
      productName: "",
      price: 0,
      productImage: "",
      description: "",
      category: "",
    },
  },
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});
export const { setProductList, setProduct } = productSlice.actions;

export default productSlice.reducer;

export function fetchProducts(offset, limit) {
  return async (dispatch) => {
    let response = await Axios.get(
      "http://localhost:8000/products/all-product",
      {
        params: {
          offset: offset,
          limit: limit,
        },
      }
    );
    console.log(response.data);
    dispatch(setProductList(response.data));
  };
}
