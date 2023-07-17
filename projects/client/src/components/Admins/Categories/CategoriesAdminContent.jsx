import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductCategories } from "../../../features/categories/ProductCategoriesSlice";
import { setSort } from "../../../features/categories/ProductCategoriesSlice";
import CategoriesTable from "./CategoriesTable";
import Pagination from "../../utils/Pagination";
import SearchInputList from "../../utils/SearchInputList";
import SortButtons from "../../utils/SortButtons";
import CreateModalCategory from "../../modals/CreateModalCategory";

function CategoriesAdminContent() {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const categories = useSelector(
    (state) => state.productCategories.productCategories
  );
  const currentPage = useSelector(
    (state) => state.productCategories.currentPage
  );
  const totalPages = useSelector((state) => state.productCategories.totalPages);
  const adminDetails = JSON.parse(localStorage.getItem("admin_details"));
  const userRole = adminDetails.role;

  const handleSort = (option) => {
    setSelectedSort(option);
    dispatch(setSort(option));
    dispatch(getAllProductCategories(currentPage, searchInput, option));
  };

  const handlePageChange = (page) => {
    dispatch(getAllProductCategories(page, searchInput, selectedSort));
  };

  useEffect(() => {
    dispatch(getAllProductCategories(currentPage, searchInput, selectedSort));
  }, [dispatch, currentPage, searchInput, selectedSort]);

  return (
    <div className="flex flex-col px-5">
      <div className="lg:flex-col lg:flex lg:justify-center lg:items-center">
        <h1 className="menu-title font-bold text-lg p-2">Categories List</h1>

        <div className="p-2 flex justify-center items-center">
          <SearchInputList
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </div>
        <div className="p-3 md:flex md:gap-5">
          <SortButtons handleSort={handleSort} />
        </div>
      </div>
      <div className="p-4">
        <CreateModalCategory disabled={userRole !== "Super Admin"} />
      </div>
      <div className="overflow-x-auto rounded-xl lg:flex lg:justify-center lg:items-center">
        <CategoriesTable categories={categories} currentPage={currentPage} />
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

export default CategoriesAdminContent;
