import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProducts,
  fetchAdminProducts,
  setCurrentPage,
} from "../../../features/products/adminProductSlice";
import DeleteModal from "../../modals/DeleteModal";
import EditModalProduct from "../../modals/EditModalProduct";
import { getAllProductCategories } from "../../../features/categories/ProductCategoriesSlice";
import CreateModalProduct from "../../modals/CreateModalProduct";
import ProductCardDashboard from "../../Product/ProductCardDashboard";
import Pagination from "../../Pagination";

function ProductContent() {
  const products = useSelector((state) => state.adminProducts.products);
  const totalPages = useSelector((state) => state.adminProducts.totalPages);
  const categories = useSelector(
    (state) => state.productCategories.productCategories
  );
  const currentPage = useSelector((state) => state.adminProducts.currentPage);
  const dispatch = useDispatch();
  const [editItemId, setEditItemId] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteItemName, setDeleteItemName] = useState("");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const openEditModal = (id_product) => {
    setEditItemId(id_product);
  };

  const closeEditModal = () => {
    setEditItemId(null);
  };

  const handleDelete = async (id_product) => {
    await dispatch(deleteProducts(id_product));
    closeDeleteModal();
  };

  const openDeleteModal = (id_product, name) => {
    setDeleteItemId(id_product);
    setDeleteItemName(name);
  };

  const closeDeleteModal = () => {
    setDeleteItemId(null);
    setDeleteItemName("");
  };

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(getAllProductCategories());
  }, [dispatch]);

  return (
    <div className=" w-full">
      <div className="">
        <div className="btn btn-primary mt-4 mx-2">
          <a
            href="#create_modal_product"
            onClick={() => {
              setCreateModalOpen(true);
            }}
          >
            Add New Product
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {products.map((product) => {
            return (
              <ProductCardDashboard
                product={product}
                key={product.id_product}
                openDeleteModal={openDeleteModal}
                openEditModal={openEditModal}
              />
            );
          })}
        </div>
      </div>
      {deleteItemId && (
        <DeleteModal
          deleteItemName={deleteItemName}
          handleDelete={() => handleDelete(deleteItemId)}
          closeDeleteModal={closeDeleteModal}
          deleteItemId={deleteItemId}
        />
      )}
      {editItemId && (
        <EditModalProduct
          editItemId={editItemId}
          closeEditModal={closeEditModal}
          categories={categories}
          openEditModal={openEditModal}
          products={products}
        />
      )}
      {isCreateModalOpen && (
        <CreateModalProduct
          closeCreateModal={() => setCreateModalOpen(false)}
          categories={categories}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(newPage) => {
          dispatch(setCurrentPage(newPage));
          dispatch(fetchAdminProducts(newPage));
        }}
      />
    </div>
  );
}

export default ProductContent;
