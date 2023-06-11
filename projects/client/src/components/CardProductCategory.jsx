import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductCategories } from "../features/categories/ProductCategoriesSlice";
import { Link, useNavigate } from "react-router-dom";

function ProductCategories() {
  //   const navigate = useNavigate();
  const product_categories = useSelector(
    (state) => state.productCategories.productCategories
  );
  const dispatch = useDispatch();
  const renderLatestProduct = () => {
    return product_categories.map((product_category) => {
      return (
        <Link to={`/products/${product_category.name}`}>
          {product_category.name}
        </Link>
      );
    });
  };

  useEffect(() => {
    dispatch(getAllProductCategories());
  }, []);

  return (
    <aside className="hidden xl:flex m-auto py-16 px-4 relative group">
      <div className="bg-slate-100 flex flex-col w-[200px] h-[300px] rounded-[8px] overflow-hidden">
        <div className=" bg-gray-900 text-slate-200 py-4 uppercase font-semibold justify-center items-center flex">
          Browse Category
        </div>
        <div className="flex flex-col gap-y-6 p-4">
          {product_categories?.map((product_category) => {
            return (
              <Link to={`/products/${product_category.name}`}>
                {product_category.name}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default ProductCategories;
