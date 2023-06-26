import React, { useEffect, useState } from "react";
import StocksTable from "./StocksTable";
import { useSelector, useDispatch } from "react-redux";
import { fetchStockData, setSort } from "../../../features/stocks/stocksSlice";
import Pagination from "../../utils/Pagination";
import SearchInputList from "../../utils/SearchInputList";
import SortButtons from "../../utils/SortButtons";
import DeleteModal from "../../modals/DeleteModal";
import CreateModalStock from "../../modals/CreateModalStock";

function StocksContent() {
  const stockProducts = useSelector(
    (state) => state.stockProducts.stockProduct
  );
  const currentPage = useSelector((state) => state.stockProducts.currentPage);
  const totalPages = useSelector((state) => state.stockProducts.totalPages);
  const [searchInput, setSearchInput] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteItemName, setDeleteItemName] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleSort = (option) => {
    setSelectedSort(option);
    dispatch(setSort(option));
    dispatch(fetchStockData(currentPage, searchInput, option)); // Fetch data for the current page
  };

  const openDeleteModal = (id_stock, product_name) => {
    setDeleteItemId(id_stock);
    setDeleteItemName(product_name);
  };

  const closeDeleteModal = () => {
    setDeleteItemId(null);
    setDeleteItemName("");
  };

  const handleDelete = async (id_stock) => {
    // await dispatch(deleteWarehouse(id_warehouse));
    closeDeleteModal();
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
        <a
          className="btn md:btn-wide btn-primary lg:my-2"
          href="#create_modal"
          onClick={() => setCreateModalOpen(true)}
        >
          Add New Warehouse
        </a>
      </div>
      <div className="overflow-x-auto rounded-xl">
        <StocksTable
          stockProducts={stockProducts}
          currentPage={currentPage}
          openDeleteModal={openDeleteModal}
        />
      </div>
      <div className="lg:w-3/4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
      {createModalOpen && (
        <CreateModalStock
          stockProducts={stockProducts}
          closeCreateModal={() => setCreateModalOpen(false)}
        />
      )}
      {deleteItemId && (
        <DeleteModal
          deleteItemName={deleteItemName}
          handleDelete={() => handleDelete(deleteItemId)}
          closeDeleteModal={closeDeleteModal}
        />
      )}
    </div>
  );
}

export default StocksContent;
