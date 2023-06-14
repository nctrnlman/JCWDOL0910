import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../features/products/productSlice";

function ProductCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const productList = useSelector((state) => state.products.productList);

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
      return (
        <div
          className={`card bg-white w-[250px] h-[350px] m-2 rounded-lg shadow-lg `}
        >
          <div className="top">
            <img
              className="w-[250px] h-[200px] object-cover  p-2"
              src={product.image_url}
              alt="img"
            />
          </div>
          <div className="bottom flex flex-col justify-center items-start p-3 bg-">
            <div className="title font-semibold text-xs my-1">
              {product.name}
            </div>
            <div className="category text-xs font-light my-1">
              {product.description}
            </div>

            <div className="pricing flex items-center">
              <div className="price ">{product.price}</div>
            </div>
            <div className="flex items-center my-2">
              <button
                className="border px-3 py-1 text-xs rounded-lg mr-1 "
                onClick={() => navigate("/product/" + product.id_product)}
              >
                See Detail
              </button>
              <button className="border px-3 py-1 text-xs rounded-lg ">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    dispatch(fetchProducts(offset, limit, sort, filter));
  }, [limit, offset]);

  return (
    <div>
      <div className="text-center p-4 text-2xl font-bold">Our Product</div>
      <div className=" bg-slate-200 flex flex-col items-center justify-center m-10 p-4 rounded gap-2">
        <div className="flex w-[450px] justify-between gap-2 ">
          <input
            type="text"
            placeholder="Product Name..."
            className="input input-bordered w-full max-w-xs"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <select
            className="select select-bordered w-[150px] max-w-xs"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">No Sort</option>
            <option value="desc">Highest price</option>
            <option value="asc">Lowest price</option>
          </select>
          <button className="btn btn-outline" onClick={handleButton}>
            Search
          </button>
        </div>
        <div className="flex flex-wrap  justify-center ">
          {renderProductList()}
        </div>
        {!open ? (
          <button className={`${open ? "hidden" : ""}`} onClick={handleSeemore}>
            See more
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              className={`btn btn-outline ${
                page <= productList.totalPages ? "" : "hidden"
              }`}
              onClick={handlePrevious}
            >
              Previous
            </button>

            <button
              className={`btn btn-outline ${
                page === productList.totalPages ? "hidden" : ""
              }`}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
