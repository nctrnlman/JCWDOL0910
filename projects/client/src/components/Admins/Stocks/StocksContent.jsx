import React, { useEffect } from "react";
import StocksTable from "./StocksTable";
import { useSelector, useDispatch } from "react-redux";
import { fetchStockData } from "../../../features/stocks/stocksSlice";
import Pagination from "../../Pagination";

function StocksContent() {
  const stockProducts = useSelector(
    (state) => state.stockProducts.stockProduct
  );
  const currentPage = useSelector((state) => state.stockProducts.currentPage);
  const totalPages = useSelector((state) => state.stockProducts.totalPages);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStockData(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(fetchStockData(page));
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="menu-title font-bold text-lg p-2">Stocks List</h1>
      <div>
        <StocksTable stockProducts={stockProducts} currentPage={currentPage} />
      </div>
      <div className="lg:w-3/4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default StocksContent;
