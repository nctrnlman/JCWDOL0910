import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/Product/ProductCard";

function Products() {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const productList = useSelector((state) => state.products.products);

  const handleSeemore = () => {
    setOpen(!open);
    setLimit(limit + 5);
    console.log(limit);
  };

  const handleNext = () => {
    setPage(page + 1);
    setOffset(offset + 10);
  };
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
      setOffset(offset - 10);
    }
  };

  const handleButton = () => {
    dispatch(fetchProducts(offset, limit, sort, filter));
  };

  const renderProductList = () => {
    const thisProduct = productList.data;
    return thisProduct?.map((product) => {
      return <ProductCard product={product} />;
    });
  };

  useEffect(() => {
    dispatch(fetchProducts(offset, limit, sort, filter));
  }, [limit, offset]);

  return (
    <div>
      <div className="text-center p-4 text-3xl lg:text-4xl font-bold">
        Our Product
      </div>
      <div className=" bg-slate-200 flex flex-col items-center justify-center m-10 p-4 rounded gap-2">
        <div className="flex w-[350px] lg:w-[450px] justify-between gap-2  text-xs lg:text-base ">
          <input
            type="text"
            placeholder="Product.."
            className="input input-bordered w-full max-w-xs text-xs lg:text-base"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <select
            className="select select-bordered w-[100px] lg:w-[150px] max-w-xs text-xs lg:text-base"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">No Sort</option>
            <option value="desc">Highest price</option>
            <option value="asc">Lowest price</option>
          </select>
          <button
            className="btn btn-outline text-xs lg:text-base"
            onClick={handleButton}
          >
            Search
          </button>
        </div>
        <div className="flex flex-wrap  justify-center ">
          {renderProductList()}
        </div>
        <div className="flex gap-3 ">
          <button
            className={`btn text-[10px] lg:text-xs btn-outline ${
              page <= productList.totalPages ? "" : "hidden"
            }`}
            onClick={handlePrevious}
          >
            Previous
          </button>

          <button
            className={`btn text-[10px] lg:text-xs btn-outline ${
              page === productList.totalPages ? "hidden" : ""
            }`}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;
