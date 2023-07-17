import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProductCategories() {
  const product_categories = useSelector(
    (state) => state.productCategories.productCategories
  );
  const navigate = useNavigate();

  return (
    <div className="flex justify-center px-5 mx-5 relative group">
      <div className="bg-slate-100 flex flex-col w-full h-auto rounded-[8px] mx-5 border-t-4 border-gray-900">
        <div className="bg-gray-900 text-slate-200 py-4 uppercase font-semibold justify-center items-center flex shadow-sm">
          Browse Category
        </div>
        <div className="overflow-x-auto">
          <div className="grid grid-flow-col gap-6 p-4">
            {product_categories?.map((product_category) => {
              return (
                <div
                  key={product_category.id_category}
                  className="flex flex-col items-center w-[250px] gap-3 hover:cursor-pointer border-r border-gray-300  p-3"
                  onClick={() =>
                    navigate(`/products/${product_category.id_category}`)
                  }
                >
                  <div className="w-full text-center">
                    <h1 className="text-xl font-bold text-gray-900">
                      {product_category.name}
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCategories;
