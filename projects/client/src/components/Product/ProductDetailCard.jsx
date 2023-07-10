import React from "react";
import AddToCartButton from "./AddToCartButton";

const ProductDetailCard = ({ product }) => {
  const imageSrc = `http://localhost:8000${product?.image_url}`;

  const formattedPrice = product?.price
    ? product.price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    : "";

  return (
    <>
      <div>
        <img
          src={imageSrc}
          className="h-[250px] lg:h-[500px] mb-2 lg:mb-0"
          alt="Product Image"
        />
      </div>
      <div className="flex flex-col max-w-md lg:w-[500px] px-3 lg:px-0">
        <h1 className="text-3xl uppercase font-bold mb-2 lg:text-5xl">
          {product?.product_name}
        </h1>
        <h1 className="text-[13px] text-gray-500 mb-2 pb-1 lg:pb-3 lg:text-base">
          Category: {product?.category}
        </h1>
        <h1 className="text-xl font-semibold pb-3 lg:pb-5 lg:text-4xl">
          {formattedPrice}
        </h1>

        <div className="flex flex-row gap-4 pb-5 lg:pb-10 py-3 items-center">
          <AddToCartButton
            product={product}
            quantity={1}
            className="btn-mobile"
          />
          <p className="font-semibold text-[10px] lg:text-[14px] text-gray-500">
            Stock: {product?.total_stock}
          </p>
        </div>
        <div className="bg-slate-200 p-3 rounded-lg">
          <h1 className="font-semibold">Product Description</h1>
          <p className="text-[10px] italic py-2 lg:text-[12px]">
            {product?.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductDetailCard;
