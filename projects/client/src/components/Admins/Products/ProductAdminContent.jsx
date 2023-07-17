import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProducts,
  fetchAdminProducts,
} from "../../../features/products/adminProductSlice";
import DeleteModal from "../../modals/DeleteModal";
import EditModalProduct from "../../modals/EditModalProduct";
import { getAllProductCategories } from "../../../features/categories/ProductCategoriesSlice";
import CreateModalProduct from "../../modals/CreateModalProduct";
import ProductCardDashboard from "../../Product/ProductCardDashboard";
import Pagination from "../../utils/Pagination";
import SortSection from "./SortSection";
import SearchSection from "./SearchSection";

function ProductAdminContent() {
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
  const [searchInput, setSearchInput] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const adminDetails = JSON.parse(localStorage.getItem("admin_details"));
  const userRole = adminDetails.role;
  const handleSort = (option) => {
    setSelectedSort(option);
    dispatch(
      fetchAdminProducts(currentPage, searchInput, option, selectedCategory)
    );
  };
  const handleSearch = () => {
    dispatch(
      fetchAdminProducts(
        currentPage,
        searchInput,
        selectedSort,
        selectedCategory
      )
    );
  };

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

  const handlePageChange = (page) => {
    dispatch(
      fetchAdminProducts(page, searchInput, selectedSort, selectedCategory)
    );
  };

  useEffect(() => {
    dispatch(getAllProductCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchAdminProducts(
        currentPage,
        searchInput,
        selectedSort,
        selectedCategory
      )
    );
  }, [dispatch, currentPage, searchInput, selectedSort, selectedCategory]);
  return (
    <div className="w-full p-5">
      <div className="">
        {userRole === "Super Admin" && (
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
        )}
        <SearchSection
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearch={handleSearch}
        />
        <SortSection
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          handleSort={handleSort}
        />
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
          key={`deleteModal-${deleteItemId}`}
          deleteItemName={deleteItemName}
          handleDelete={() => handleDelete(deleteItemId)}
          closeDeleteModal={closeDeleteModal}
          deleteItemId={deleteItemId}
        />
      )}
      {editItemId && (
        <EditModalProduct
          key={`editModal-${editItemId}`}
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
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default ProductAdminContent;
