import React, { useEffect, useState } from "react";
import StocksTable from "./StocksTable";
import { useSelector, useDispatch } from "react-redux";
import { fetchStockData, setSort } from "../../../features/stocks/stocksSlice";
import Pagination from "../../utils/Pagination";
import SearchInputList from "../../utils/SearchInputList";
import SortButtons from "../../utils/SortButtons";

function StocksContent() {
  const stockProducts = useSelector(
    (state) => state.stockProducts.stockProduct
  );
  const currentPage = useSelector((state) => state.stockProducts.currentPage);
  const totalPages = useSelector((state) => state.stockProducts.totalPages);
  const [searchInput, setSearchInput] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const dispatch = useDispatch();

  const handleSort = (option) => {
    setSelectedSort(option);
    dispatch(setSort(option));
    dispatch(fetchStockData(1, searchInput, option));
  };

  const handlePageChange = (page) => {
    dispatch(fetchStockData(page, searchInput, selectedSort));
  };

  useEffect(() => {
    dispatch(fetchStockData(currentPage, searchInput, selectedSort));
  }, [dispatch, currentPage, searchInput, selectedSort]);

  return (
    <div className="flex flex-col px-5">
      <div className="lg:flex-col lg:flex lg:justify-center lg:items-center">
        <h1 className="menu-title font-bold text-lg p-2">Stocks List</h1>
        <div className="p-2 mb-2">
          <SearchInputList
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </div>
        <div>
          <SortButtons handleSort={handleSort} />
        </div>
      </div>
      <div className="lg:flex lg:justify-start py-3">
        <a className="btn md:btn-wide btn-primary lg:my-2" href="#create_modal">
          Add New Warehouse
        </a>
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
