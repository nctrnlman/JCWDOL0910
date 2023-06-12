import React from "react";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";
import { useNavigate } from "react-router-dom";

const NewProduct = ({ product }) => {
  const { id, image_url, name, description, price } = product;

  return (
    <div className="card bg-white w-[200px] h-auto m-2 rounded-lg shadow-lg">
      <div className="top">
        <img
          className="w-[200px] h-[200px] object-cover p-2"
          src={image_url}
          alt="img"
        />
      </div>
      <div className="bottom flex flex-col justify-center items-start p-3 bg-">
        <div className="title font-semibold text-xs my-1">{name}</div>
        <div className="category text-xs font-light my-1">{description}</div>
        <div className="pricing flex items-center">
          <div className="price">{price}</div>
        </div>
        <div className="flex items-center my-2 gap-3">
          <div>
            <BuyNowButton />
          </div>
          <div>
            <AddToCartButton id_product={id} name={name} price={price} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
