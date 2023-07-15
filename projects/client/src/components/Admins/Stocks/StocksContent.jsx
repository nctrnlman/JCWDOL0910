import React, { useEffect, useState } from "react";
import StocksTable from "./StocksTable";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteStockData,
  fetchStockData,
  setSort,
} from "../../../features/stocks/stocksSlice";
import Pagination from "../../utils/Pagination";
import SearchInputList from "../../utils/SearchInputList";
import SortButtons from "../../utils/SortButtons";
import DeleteModal from "../../modals/DeleteModal";
import CreateModalStock from "../../modals/CreateModalStock";
import EditModalStock from "../../modals/EditModalStock";

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
  const [editItemId, setEditItemId] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

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
    await dispatch(deleteStockData(id_stock));
    closeDeleteModal();
  };

  const openEditModal = (id_stock) => {
    setEditItemId(id_stock);
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setEditItemId(null);
    setEditModalOpen(false);
  };

  const handlePageChange = (page) => {
    dispatch(fetchStockData(page, searchInput, selectedSort));
  };

  useEffect(() => {
    dispatch(fetchStockData(currentPage, searchInput, selectedSort));
  }, [dispatch, currentPage, searchInput, selectedSort]);

  return (
    <div className="flex flex-col px-5">
      <div className="flex flex-col justify-center items-center lg:flex lg:justify-center lg:items-center">
        <h1 className="menu-title font-bold text-lg p-2">Stocks List</h1>
        <div className="p-2 mb-2">
          <SearchInputList setSearchInput={setSearchInput} />
        </div>
        <div>
          <SortButtons handleSort={handleSort} />
        </div>
      </div>
      <div className="lg:flex lg:justify-center lg:items-center py-3">
        <a
          className="btn md:btn-wide btn-primary lg:my-2"
          href="#create_modal"
          onClick={() => setCreateModalOpen(true)}
        >
          Add New Stock
        </a>
      </div>
      <div className="overflow-x-auto rounded-xl lg:flex lg:justify-center lg:items-center">
        <StocksTable
          stockProducts={stockProducts}
          currentPage={currentPage}
          openDeleteModal={openDeleteModal}
          openEditModal={openEditModal}
        />
      </div>
      <div className="flex justify-center items-center">
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
      {editModalOpen && editItemId && (
        <EditModalStock stockId={editItemId} closeEditModal={closeEditModal} />
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
