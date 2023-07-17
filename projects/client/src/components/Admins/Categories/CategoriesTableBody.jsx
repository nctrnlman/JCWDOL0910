import React from "react";
import { useSelector } from "react-redux";
import EditModalCategory from "../../modals/EditModalCategory";
import DeleteModalCategory from "../../modals/DeleteModalCategory";

function CategoriesTableBody({ categories, currentPage }) {
  const itemsPerPage = useSelector(
    (state) => state.productCategories.itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const adminDetails = JSON.parse(localStorage.getItem("admin_details"));
  const userRole = adminDetails.role;

  return (
    <>
      <tbody className="lg:text-lg">
        {categories?.length === 0 ? (
          <tr>
            <td colSpan="8" className="text-center">
              No data available.
            </td>
          </tr>
        ) : (
          categories.map((category, index) => (
            <tr key={category.id_category} className="hover">
              <th className="text-center">{startIndex + index + 1}</th>
              <td>{category.name}</td>
              <td>
                <div className="flex flex-col gap-2 ">
                  <EditModalCategory
                    categoryId={category.id_category}
                    categoryName={category.name}
                    disabled={userRole !== "Super Admin"}
                  />
                  <DeleteModalCategory
                    categoryId={category.id_category}
                    categoryName={category.name}
                    disabled={userRole !== "Super Admin"}
                  />
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </>
  );
}

export default CategoriesTableBody;
