import React from "react";
import { useSelector } from "react-redux";

function StocksTableBody({
  stockProducts,
  currentPage,
  openDeleteModal,
  openEditModal,
}) {
  const itemsPerPage = useSelector((state) => state.stockProducts.itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <tbody>
      {stockProducts.map((stock, index) => (
        <tr key={stock.id_stock}>
          <td>{startIndex + index + 1}</td>
          <td>{stock.product_name}</td>
          <td>{stock.warehouse_name}</td>
          <td>{stock.total_stock}</td>
          <td className="relative">
            <div className="gap-5 grid grid-cols-1 items-center justify-center">
              <a
                href="#edit_modal"
                className="btn btn-xs w-12 lg:w-2/4 btn-info lg:btn-sm"
                onClick={() => openEditModal(stock.id_stock)}
              >
                Edit
              </a>
              <a
                className="btn btn-xs w-12 lg:w-2/4 btn-error lg:btn-sm"
                href="#delete_modal"
                onClick={() =>
                  openDeleteModal(stock.id_stock, stock.product_name)
                }
              >
                Delete
              </a>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default StocksTableBody;
