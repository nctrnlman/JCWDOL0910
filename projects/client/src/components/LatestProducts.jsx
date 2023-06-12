import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getLatestProducts } from "../features/LatestProductsSlice";
import { Link } from "react-router-dom";

function LatestProducts() {
  const latest_products = useSelector(
    (state) => state.latestProducts.latest_products
  );
  const dispatch = useDispatch();

  const renderLatestProduct = () => {
    return latest_products.map((latest_product) => {
      return (
        <div className="card bg-white w-[200px] h-[350px] m-2 rounded-lg shadow-lg">
          <div className="top">
            <img
              className="w-[200px] h-[200px] object-cover  p-2"
              src={latest_product.image_url}
              alt="img"
            />
          </div>
          <div className="bottom flex flex-col justify-center items-start p-3 bg-">
            <div className="title font-semibold text-xs my-1">
              {latest_product.name}
            </div>
            <div className="category text-xs font-light my-1">
              {latest_product.description}
            </div>

            <div className="pricing flex items-center">
              {" "}
              <div className="price ">{latest_product.price}</div>
            </div>
            <div className="flex items-center my-2">
              <button className="border px-3 py-1 text-xs rounded-lg mr-1 ">
                Buy Now
              </button>
              <button className="border px-3 py-1 text-xs rounded-lg ">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      );
    });
  };
  useEffect(() => {
    dispatch(getLatestProducts());
  }, []);

  return (
    <div>
      <div className="text-center py-4 text-2xl font-bold">New Arrival</div>
      <div
        id="content"
        className=" bg-slate-200 flex items-center justify-center m-10 rounded"
      >
        {latest_products?.map((latest_product) => {
          return (
            <div className="card bg-white w-[200px] h-[350px] m-2 rounded-lg shadow-lg">
              <div className="top">
                <img
                  className="w-[200px] h-[200px] object-cover  p-2"
                  src={latest_product.image_url}
                  alt="img"
                />
              </div>
              <div className="bottom flex flex-col justify-center items-start p-3 bg-">
                <div className="title font-semibold text-xs my-1">
                  {latest_product.name}
                </div>
                <div className="category text-xs font-light my-1">
                  {latest_product.description}
                </div>

                <div className="pricing flex items-center">
                  {" "}
                  <div className="price ">{latest_product.price}</div>
                </div>
                <div className="flex items-center my-2">
                  <button className="border px-3 py-1 text-xs rounded-lg mr-1 ">
                    Buy Now
                  </button>
                  <button className="border px-3 py-1 text-xs rounded-lg ">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default LatestProducts;
