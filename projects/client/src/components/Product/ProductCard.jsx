import React from "react";
import SeeDetailButton from "./SeeDetailButton";
import AddToCartButton from "./AddToCartButton";
function ProductCard(props) {
  const { product } = props;
  const formattedPrice = product.price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

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
          <div className="price">{formattedPrice}</div>
        </div>
        <div className="flex items-center my-2 gap-3">
          <div>
            <SeeDetailButton productId={product.id_product} />
          </div>
          <div>
            <AddToCartButton product={product} quantity={1} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
