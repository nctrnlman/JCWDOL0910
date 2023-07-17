import React from "react";
import { useLocation } from "react-router-dom";
import SeeDetailButton from "./SeeDetailButton";
import AddToCartButton from "./AddToCartButton";

function ProductCard(props) {
  const { product, openDeleteModal, openEditModal } = props;
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin-products";

  const formattedPrice = product?.price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const imageSrc = `http://localhost:8000${product.image_url}`;

  return (
    <div className="card bg-white w-[160px] lg:w-[250px] m-2 rounded-lg shadow-lg">
      <div className="top">
        <img
          className="w-[200px] h-[150px] lg:w-[300px] lg:h-[200px] object-cover p-2"
          src={imageSrc}
          alt="img"
        />
      </div>
      <div className="bottom flex flex-col justify-center items-start p-3 ">
        <div className="title font-semibold text-sm lg:text-lg my-1">
          {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
        </div>
        <div className="pricing flex items-center text-[12px] lg:text-sm">
          <div className="price">{formattedPrice}</div>
        </div>
        <div className="text-[10px] lg:text-xs pt-2 text-gray-500">
          Stock: {product.total_stock}
        </div>
        <div className="flex items-center my-2 gap-3">
          {isAdminRoute ? (
            <div className="flex items-center my-2 gap-3">
              <div className="gap-5 flex flex-row ">
                <a
                  className="btn btn-xs w-12 lg:w-2/4 btn-info"
                  href="#edit_modal_product"
                  onClick={() => openEditModal(product.id_product)}
                >
                  Edit
                </a>
                <a
                  className="btn btn-xs w-12 lg:w-2/4 btn-error"
                  href="#delete_modal"
                  onClick={() =>
                    openDeleteModal(product.id_product, product.name)
                  }
                >
                  Delete
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-center my-2 gap-3">
              <div className="">
                <SeeDetailButton productId={product.id_product} />
              </div>
              <div>
                <AddToCartButton product={product} quantity={1} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
