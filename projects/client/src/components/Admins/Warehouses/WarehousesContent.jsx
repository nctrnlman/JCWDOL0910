import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWarehouse,
  fetchWarehouses,
  createWarehouse,
} from "../../../features/warehouses/warehouseSlice";
import DeleteModal from "../../modals/DeleteModal";
import EditModalWarehouse from "../../modals/EditModalWarehouse";
import WarehouseTable from "./WarehouseTable";
import CreateModalWarehouse from "../../modals/CreateModalWarehouse";
import Pagination from "../../utils/Pagination";
import SearchInputList from "../../utils/SearchInputList";
import SortButtons from "../../utils/SortButtons";

const WarehousesContent = () => {
  const warehouses = useSelector((state) => state.warehouses.warehouse);
  const currentPage = useSelector((state) => state.warehouses.currentPage);
  const totalPages = useSelector((state) => state.warehouses.totalPages);
  const dispatch = useDispatch();
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteItemName, setDeleteItemName] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const handleSort = (option) => {
    setSelectedSort(option);
    dispatch(fetchWarehouses(currentPage, searchInput, selectedSort)); // Fetch data for the current page
  };

  const handlePageChange = (page) => {
    dispatch(fetchWarehouses(page, searchInput, selectedSort));
  };

  const handleDelete = async (id_warehouse) => {
    await dispatch(deleteWarehouse(id_warehouse));
    closeDeleteModal();
  };

  const openDeleteModal = (id_warehouse, name) => {
    setDeleteItemId(id_warehouse);
    setDeleteItemName(name);
  };

  const closeDeleteModal = () => {
    setDeleteItemId(null);
    setDeleteItemName("");
  };

  const openEditModal = (id_warehouse) => {
    setEditItemId(id_warehouse);
  };

  const closeEditModal = () => {
    setEditItemId(null);
  };

  const handleCreate = async (newWarehouseData) => {
    await dispatch(createWarehouse(newWarehouseData));
    setCreateModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchWarehouses(currentPage, searchInput, selectedSort));
  }, [dispatch, currentPage, searchInput, selectedSort]);

  return (
    <div className="flex flex-col  bg-base-200 h-screen overflow-auto">
      <div className="flex flex-col justify-center items-center lg:flex lg:justify-center lg:items-center  gap-5 lg:gap-0">
        <h1 className="menu-title font-bold text-lg p-2">Warehouse List</h1>
        <div className="p-2 mb-2">
          <SearchInputList setSearchInput={setSearchInput} />
        </div>
        <div>
          <SortButtons handleSort={handleSort} />
        </div>
        <div className="lg:flex lg:justify-start">
          <a
            className="btn md:btn-wide btn-primary lg:relative lg:right-auto lg:top-auto lg:my-3"
            href="#create_modal"
            onClick={() => setCreateModalOpen(true)}
          >
            Add New Warehouse
          </a>
        </div>
        <div className="h-auto w-full lg:max-w-screen-xl mb-5 lg:w-auto xl:w-screen flex justify-center lg:justify-start">
          <div className="overflow-x-auto rounded-xl mx-3 lg:mx-0">
            <WarehouseTable
              warehouses={warehouses}
              currentPage={currentPage}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
      {deleteItemId && (
        <DeleteModal
          deleteItemName={deleteItemName}
          handleDelete={() => handleDelete(deleteItemId)}
          closeDeleteModal={closeDeleteModal}
        />
      )}
      {editItemId && (
        <EditModalWarehouse
          editItemId={editItemId}
          closeEditModal={closeEditModal}
          warehouses={warehouses}
        />
      )}
      {createModalOpen && (
        <CreateModalWarehouse
          closeCreateModal={() => setCreateModalOpen(false)}
          handleCreate={handleCreate}
          warehouses={warehouses}
        />
      )}
    </div>
  );
};

export default WarehousesContent;
