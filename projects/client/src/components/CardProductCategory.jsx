import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductCategories } from "../features/categories/ProductCategoriesSlice";
import { useNavigate } from "react-router-dom";

function ProductCategories() {
  const product_categories = useSelector(
    (state) => state.productCategories.productCategories
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProductCategories());
  }, [dispatch]);

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
                  className="flex flex-col items-center w-[250px] gap-3 hover:cursor-pointer"
                  onClick={() => navigate(`/products/${product_category.name}`)}
                >
                  <img
                    src={require("../assets/Logo.png")}
                    alt={product_category.name}
                    className="w-32 h-12"
                  />
                  <div className="w-full text-center">
                    {product_category.name}
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
