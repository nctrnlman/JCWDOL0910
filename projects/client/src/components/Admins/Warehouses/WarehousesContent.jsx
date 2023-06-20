import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWarehouse,
  fetchWarehouses,
} from "../../../features/warehouses/warehouseSlice";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../modals/DeleteModal";
import WarehouseTable from "./WarehouseTable";

const WarehousesContent = () => {
  const warehouses = useSelector((state) => state.warehouses.warehouse);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteItemName, setDeleteItemName] = useState("");

  const handleDelete = async (id_warehouse) => {
    await dispatch(deleteWarehouse(id_warehouse));
  };

  const openDeleteModal = (id_warehouse, name) => {
    setDeleteItemId(id_warehouse);
    setDeleteItemName(name);
  };

  const closeDeleteModal = () => {
    setDeleteItemId(null);
    setDeleteItemName("");
  };

  useEffect(() => {
    dispatch(fetchWarehouses());
  }, [dispatch]);
  return (
    <div className=" bg-base-200 flex flex-col lg:flex-row lg:justify-start justify-center w-screen lg:h-full lg:w-screen p-8 pl-3 lg:ml-0 lg:pl-0">
      <div className="flex flex-col gap-12 lg:gap-0 text-white p-4 h-screen lg:h-auto lg:w-screen lg:max-w-screen-md">
        <div className="lg:flex lg:justify-start">
          <button className="absolute top-10 right-15 btn lg:btn-wide btn-primary lg:relative lg:right-auto lg:top-auto lg:my-2 mt-5">
            Add New Warehouse
          </button>
        </div>
        {/* cara pin table supaya ga bisa di drag tapi bisa discrolled */}
        <div className="max-h-full h-3/4 lg:max-w-screen-xl lg:max-h-fit lg:h-5/6 lg:w-screen flex justify-center lg:justify-start mt-8 lg:mt-0 mr-10 lg:mr-0 ">
          <div className="overflow-x-auto rounded-xl">
            <WarehouseTable
              warehouses={warehouses}
              navigate={navigate}
              openDeleteModal={openDeleteModal}
            />
            {deleteItemId && (
              <DeleteModal
                deleteItemName={deleteItemName}
                handleDelete={() => handleDelete(deleteItemId)}
                closeDeleteModal={closeDeleteModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehousesContent;
