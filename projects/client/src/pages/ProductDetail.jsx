import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../features/products/productSlice";
import { BiCart } from "react-icons/bi";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);
  console.log({ id });

  useEffect(() => {
    dispatch(getProductById(id));
  }, []);

  return (
    <div className="hero min-h-screen bg-base-200 overflow-auto">
      <div className="hero-content flex flex-col lg:flex-row items-center lg:gap-6 lg:items-start">
        <img
          src={product?.image_url}
          className="max-w-[340px] lg:max-w-md rounded-lg shadow-2xl mb-4 lg:mb-0"
          alt="Product Image"
        />
        <div className="flex flex-col max-w-md lg:max-w-[500px]  ">
          <h1 className="text-4xl uppercase font-bold mb-2 lg:text-5xl">
            {product?.product_name}
          </h1>
          <h1 className="text-sm text-gray-500 mb-2 pb-3 lg:text-base">
            Category: {product?.category}
          </h1>
          <h1 className="text-3xl font-semibold pb-5 lg:text-4xl">
            Rp.{product?.price}
          </h1>
          <p className="whitespace-pre-wrap text-sm italic py-2 lg:text-base">
            {product?.description}
          </p>
          <p className="text-gray-500 mt-2 ">Stock : {product?.stock}</p>
          <button className="btn btn-neutral w-20 mt-4 lg:w-26 ">
            <BiCart className="w-6 h-6 lg:w-8 lg:h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
