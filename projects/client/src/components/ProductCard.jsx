import React from "react";
import { useNavigate } from "react-router";
function ProductCard(props) {
  const { product } = props;
  const navigate = useNavigate();

  return (
    <div>
      <div
        className={`card bg-white w-[150px] h-[200px] lg:w-[250px] lg:h-[350px] m-2 rounded-lg shadow-lg `}
      >
        <div className="top">
          <img
            className="w-[150px] h-[100px] lg:w-[250px] lg:h-[200px] object-cover p-1 lg:p-2"
            src={product.image_url}
            alt="img"
          />
        </div>
        <div className="bottom flex flex-col justify-center items-start px-2 lg:p-3 ">
          <div className="title font-semibold text-[10px] lg:text-base my-1 uppercase">
            {product.name}
          </div>
          <div className="pricing flex items-center text-[10px] lg:text-base">
            <div className="price ">Rp.{product.price}</div>
          </div>
          <div className="flex items-center text-[8px] my-2">
            <button
              className="border px-3 py-1 lg:text-xs  rounded-lg mr-1 "
              onClick={() => navigate("/product/" + product.id_product)}
            >
              See Detail
            </button>
            <button className="border px-3 py-1 lg:text-xs  rounded-lg ">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
