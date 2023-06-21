import React, { useEffect, useState } from "react";
import {
  deleteProducts,
  fetchAdminProducts,
} from "../../../features/products/adminProductSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../Product/ProductCard";
import DeleteModal from "../../modals/DeleteModal";
import { useNavigate } from "react-router-dom";
import EditModalProduct from "../../modals/EditModalProduct";
import { getAllProductCategories } from "../../../features/categories/ProductCategoriesSlice";
import CreateModalProduct from "../../modals/CreateModalProduct"; // Add this line

function ProductContent() {
  const products = useSelector((state) => state.adminProducts.products);
  const categories = useSelector(
    (state) => state.productCategories.productCategories
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOverflowVisible, setOverflowVisible] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteItemName, setDeleteItemName] = useState("");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false); // Add this line

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

  useEffect(() => {
    const handleResize = () => {
      setOverflowVisible(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-base-200 flex flex-col lg:flex-row lg:justify-start justify-center w-screen lg:h-full lg:w-screen p-8 pl-3 lg:ml-0 lg:pl-0">
      <div className="flex flex-col gap-12 lg:gap-0 text-white p-4 h-screen lg:h-auto lg:w-screen lg:max-w-screen-md">
        <div className="lg:flex lg:justify-start">
          <a
            href="#create_modal_product"
            className="absolute top-10 right-12 btn lg:btn-wide btn-primary lg:relative lg:right-auto lg:top-auto lg:my-2 mt-5"
            onClick={() => {
              setCreateModalOpen(true);
            }}
          >
            Add New Product
          </a>
        </div>
        <div className="max-h-full h-3/4 lg:max-w-screen-xl lg:max-h-fit lg:h-5/6 lg:w-screen flex justify-center lg:justify-start mt-8 lg:mt-0 mr-10 lg:mr-0">
          {/* diset fixed biar ga bisa geser,harus dicek lagi */}
          <div
            className={`rounded-xl text-neutral gap-10 lg:gap-5 grid  w-full lg:mr-8 lg:px-6 h-[500px] lg:h-screen lg:max-h-[630px] justify-center fixed lg:relative lg:grid-cols-5 ${
              isOverflowVisible ? "overflow-x-auto" : " overflow-y-auto"
            }`}
          >
            {products.map((product) => {
              const imageSrc = `http://localhost:8000${product.image_url}`;
              return (
                <ProductCard
                  product={product}
                  key={product.id_product}
                  openDeleteModal={openDeleteModal}
                  openEditModal={openEditModal}
                  imageSrc={imageSrc}
                />
              );
            })}
          </div>
        </div>
      </div>
      {deleteItemId && (
        <DeleteModal
          deleteItemName={deleteItemName}
          handleDelete={() => handleDelete(deleteItemId)}
          closeDeleteModal={closeDeleteModal}
          deleteItemId={deleteItemId} // Add this line
        />
      )}
      {editItemId && (
        <EditModalProduct
          editItemId={editItemId}
          closeEditModal={closeEditModal}
          categories={categories}
          openEditModal={openEditModal}
          products={products} // Add this line
        />
      )}
      {isCreateModalOpen && ( // Add this block
        <CreateModalProduct
          closeCreateModal={() => setCreateModalOpen(false)}
          categories={categories}
        />
      )}
    </div>
  );
}

export default ProductContent;
