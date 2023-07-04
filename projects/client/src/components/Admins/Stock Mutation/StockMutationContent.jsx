import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStockMutation } from "../../../features/stock-mutation/stockMutationSlice";
import { setSort } from "../../../features/stocks/stocksSlice";
import Pagination from "../../utils/Pagination";
import SearchInputList from "../../utils/SearchInputList";
import SortButtons from "../../utils/SortButtons";
function StockMutationContent() {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const stockMutation = useSelector(
    (state) => state.stockMutations.stockMutation
  );
  const currentPage = useSelector((state) => state.stockMutations.currentPage);
  const totalPages = useSelector((state) => state.stockMutations.totalPages);
  const itemsPerPage = useSelector(
    (state) => state.stockMutations.itemsPerPage
  );

  const handleSort = (option) => {
    setSelectedSort(option);
    dispatch(setSort(option));
    dispatch(fetchStockMutation(currentPage, searchInput, option)); // Fetch data for the current page
  };

  const handlePageChange = (page) => {
    dispatch(fetchStockMutation(page, searchInput, selectedSort));
  };

  const renderStockMutation = () => {
    return stockMutation?.map((sm, index) => {
      const date = sm.created_at.substring(0, 10);
      // Memisahkan tanggal, bulan, dan tahun
      const [year, month, day] = date.split("-");
      // Menggabungkan tanggal, bulan, dan tahun dalam format "DD-MM-YYYY"
      const formattedDate = `${day}-${month}-${year}`;
      const time = sm.created_at.substring(11, 16);
      const startIndex = (currentPage - 1) * itemsPerPage;
      return (
        <tr>
          <td>{startIndex + index + 1}</td>
          <td>{sm.product_name}</td>
          <td>{sm.request_warehouse}</td>
          <td>{sm.send_warehouse}</td>
          <td>{sm.quantity}</td>
          <td>{formattedDate}</td>
          <td>{time}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    dispatch(fetchStockMutation(currentPage, searchInput, selectedSort));
  }, [dispatch, currentPage, searchInput, selectedSort]);

  return (
    <div className="flex flex-col px-5">
      <div className="lg:flex-col lg:flex lg:justify-center lg:items-center pb-4">
        <h1 className="menu-title font-bold text-lg p-2">
          Stock Warehouse List
        </h1>
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

      <div className="overflow-x-auto rounded-xl lg:flex lg:justify-center lg:items-center">
        <table className="table table-zebra  text-black bg-primary h-3/4 lg:h-full lg:max-h-fit w-full lg:w-screen lg:max-w-screen-xl">
          {/* head */}
          <thead className="sticky top-0">
            <tr className="bg-base-300 text-base-content lg:text-lg">
              <th></th>
              <th>Product Name</th>
              <th>Request Warehosue</th>
              <th>Send Warehosue</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>{renderStockMutation()}</tbody>
        </table>
      </div>
      <div className="lg:flex lg:justify-center lg:items-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default StockMutationContent;
