import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductByCategory } from "../features/products/productSlice";
import ProductCard from "../components/Product/ProductCard";

function ProductCategory() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const productCategory = useSelector(
    (state) => state.products.productCategory
  );

  console.log(category);

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
    dispatch(getProductByCategory(category, offset, limit, sort, filter));
  };

  const renderProductList = () => {
    const thisProduct = productCategory.data;
    return thisProduct?.map((product) => {
      return <ProductCard product={product} />;
    });
  };

  useEffect(() => {
    dispatch(getProductByCategory(category, offset, limit, sort, filter));
  }, [limit, offset, category]);

  return (
    <div>
      <div className="text-center p-4 text-2xl font-bold uppercase">
        Category : {category}
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
        <div className="flex gap-3">
          <button
            className={`btn btn-outline ${
              page <= productCategory.totalPages ? "" : "hidden"
            }`}
            onClick={handlePrevious}
          >
            Previous
          </button>

          <button
            className={`btn btn-outline ${
              page === productCategory.totalPages ? "hidden" : ""
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

export default ProductCategory;
