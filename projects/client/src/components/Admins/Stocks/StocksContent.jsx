import React, { useEffect, useState } from "react";
import StocksTable from "./StocksTable";
import { useSelector, useDispatch } from "react-redux";
import { fetchStockData } from "../../../features/stocks/stocksSlice";
import Pagination from "../../Pagination";
import SearchInputList from "../../utils/SearchInputList";

function StocksContent() {
  const stockProducts = useSelector(
    (state) => state.stockProducts.stockProduct
  );
  const currentPage = useSelector((state) => state.stockProducts.currentPage);
  const totalPages = useSelector((state) => state.stockProducts.totalPages);
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(fetchStockData(1, searchInput));
  };

  const handlePageChange = (page) => {
    dispatch(fetchStockData(page, searchInput));
  };
  useEffect(() => {
    dispatch(fetchStockData(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div className="flex flex-col justify-center items-center px-4">
      <h1 className="menu-title font-bold text-lg p-2">Stocks List</h1>
      <div className="p-2 mb-2">
        <SearchInputList
          handleSearch={handleSearch}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </div>
      <div className="overflow-x-auto rounded-xl">
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
