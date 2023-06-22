import React from "react";
import AddToCartButton from "./Product/AddToCartButton";
import BuyNowButton from "./Cart/BuyNowButton";

const NewProduct = ({ product }) => {
  return (
    <div className="card bg-white w-[200px] lg:w-[220px] h-auto m-2 rounded-lg shadow-lg">
      <div className="top">
        <img
          className="w-[300px] h-[200px] object-cover p-2"
          src={product.image_url}
          alt="img"
        />
      </div>
      <div className="bottom flex flex-col justify-center items-start p-3 bg-">
        <div className="title font-semibold text-xs my-1">{product.name}</div>
        <div className="category text-xs font-light my-1">
          {product.description}
        </div>
        <div className="pricing flex items-center">
          <div className="price">{product.price}</div>
        </div>
        <div className="flex items-center my-2 gap-3">
          <div>
            <BuyNowButton />
          </div>
          <div>
            <AddToCartButton product={product} quantity={1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
