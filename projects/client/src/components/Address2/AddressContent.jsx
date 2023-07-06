import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress, addAddress, deleteAddress } from "../../features/UserAddress";
// import {
//   deleteAddress,
//   getAddress,
//   addAddress,
// } from "../../../features/warehouses/warehouseSlice";
import DeleteModal from "./DeleteModal";
import EditModalAddress from "./EditModalAddress";
import AddressTable from "./AddressTable";
import CreateModalAddress from "./CreateModalAddress";

const AddressContent = () => {
  const addresses = useSelector((state) => state.addresses.addresses);
  const dispatch = useDispatch();
  const [deleteItemId, setDeleteItemId] = useState(null);
  // const [deleteItemName, setDeleteItemName] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleDelete = async (id_address) => {
    await dispatch(deleteAddress(id_address));
    console.log("id untuk dihapus", id_address)
    closeDeleteModal();
  };

  const openDeleteModal = (id_address) => {
    setDeleteItemId(id_address);
    // setDeleteItemName(name);
  };

  const closeDeleteModal = () => {
    setDeleteItemId(null);
    // setDeleteItemName("");
  };

  const openEditModal = (id_address) => {
    setEditItemId(id_address);
  };

  const closeEditModal = () => {
    setEditItemId(null);
  };

  const handleCreate = async (newAddressData) => {
    await dispatch(addAddress(newAddressData));
    setCreateModalOpen(false);
  };

  useEffect(() => {
    dispatch(getAddress());
  }, [dispatch]);

  return (
    <div className="bg-base-100 h-screen flex flex-col lg:flex-row lg:justify-start justify-center lg:items-center w-screen lg:h-full lg:w-full">
      <div className="flex flex-col gap-5 lg:gap-3 text-white p-4 h-screen lg:h-auto lg:w-screen lg:max-w-screen-md lg:mx-5 xl:mx-10">
        <div className="lg:flex lg:justify-start">
          <a
            className="btn md:btn-wide btn-primary lg:relative lg:right-auto lg:top-auto lg:my-2"
            href="#create_modal"
            onClick={() => setCreateModalOpen(true)}
          >
            Add New Address
          </a>
        </div>
        <div className="h-[520px] w-full lg:max-w-screen-xl lg:max-h-fit lg:h-screen lg:w-[950px] xl:w-screen flex justify-center lg:justify-start">
          <div className="overflow-x-auto rounded-xl">
            <AddressTable
              addresses={addresses}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          </div>
        </div>
      </div>
      {deleteItemId && (
        <DeleteModal
          // deleteItemName={deleteItemName}
          handleDelete={() => handleDelete(deleteItemId)}
          closeDeleteModal={closeDeleteModal}
        />
      )}
      {editItemId && (
        <EditModalAddress
          editItemId={editItemId}
          closeEditModal={closeEditModal}
          addresses={addresses}
        />
      )}
      {createModalOpen && (
        <CreateModalAddress
          closeCreateModal={() => setCreateModalOpen(false)}
          handleCreate={handleCreate}
          addresses={addresses}
        />
      )}
    </div>
  );
};

export default AddressContent;
