import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLatestProducts } from "../features/products/LatestProductsSlice";
import NewProduct from "./NewProducts";

function LatestProducts() {
  const latest_products = useSelector(
    (state) => state.latestProducts.latest_products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLatestProducts());
  }, [dispatch]);

  return (
    <div>
      <div className="text-center py-4 text-2xl font-bold">New Arrival</div>
      <div className="bg-slate-200 flex flex-wrap justify-center items-center m-10 rounded">
        <div className="overflow-x-auto flex flex-row py-5">
          {latest_products?.map((product) => (
            <div
              key={product.id}
              className="w-full sm:w-[200px] m-2 flex justify-center"
            >
              <NewProduct product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LatestProducts;
