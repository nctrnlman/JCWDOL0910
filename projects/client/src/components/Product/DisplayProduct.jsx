import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice";
import ProductCard from "./ProductCard";

function DisplayProduct() {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(5);
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const productList = useSelector((state) => state.products.products);

  const handleSeemore = () => {
    setOpen(!open);
    setLimit(limit + 5);
  };

  const renderProductList = () => {
    const thisProduct = productList.data;
    return thisProduct?.map((product) => {
      return <ProductCard key={product.id_product} product={product} />;
    });
  };

  useEffect(() => {
    dispatch(fetchProducts(offset, limit, sort, filter));
  }, [limit, offset]);

  return (
    <div>
      <div className="text-center p-4 text-2xl font-bold">Our Product</div>
      <div className=" bg-slate-200 flex flex-col items-center justify-center m-10 p-4 rounded gap-2">
        <div className="flex flex-wrap  justify-center ">
          {renderProductList()}
        </div>
        <button className={`${open ? "hidden" : ""}`} onClick={handleSeemore}>
          See more
        </button>
      </div>
    </div>
  );
}

export default DisplayProduct;
